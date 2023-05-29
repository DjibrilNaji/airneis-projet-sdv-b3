import OrderModel from "@/api/db/models/OrderModel"
import validate from "@/api/middlewares/validate.js"
import mw from "@/api/mw.js"
import { idValidator, integerValidator, stringValidator } from "@/validators"
import knex from "knex"
import config from "@/api/config"
import RelOrderProductModel from "@/api/db/models/RelOrderProductModel"
import s3 from "@@/configAWS.js"
import BillingAddressModel from "@/api/db/models/BillingAddressModel"
import AddressModel from "@/api/db/models/AddressModel"
import ProductModel from "@/api/db/models/ProductModel"

const db = knex(config.db)

const handler = mw({
  GET: [
    validate({
      query: {
        numberOrder: stringValidator.required(),
      },
    }),
    async ({
      locals: {
        query: { numberOrder },
      },
      res,
    }) => {
      const order = await OrderModel.query()
        .where({ numberOrder: numberOrder })
        .orderBy("createdAt")
        .select(
          "orders.id",
          "orders.userId",
          "orders.addressId",
          "orders.numberOrder",
          "orders.status",
          "orders.createdAt",
          "orders.price_formatted",
          "orders.amount_tva_formatted"
        )
        .groupBy(
          "orders.id",
          "orders.numberOrder",
          "orders.status",
          "orders.createdAt"
        )

      if (!order) {
        res.status(401).send({ error: "No orders found" })

        return
      }

      const allProductsOrder = await ProductModel.query()
        .withGraphFetched("image")
        .withGraphJoined("order")
        .where("order_join.orderId", order[0].id)
        .distinctOn("products.id")
        .select(
          "image.urlImage",
          "products.name",
          "products.description",
          "products.price_formatted",
          "products.id",
          "products.stock",
          "order_join.quantity"
        )

      allProductsOrder.map((product) => {
        product.urlImage = s3.getSignedUrl("getObject", {
          Bucket: "airness-matd",
          Key: product.urlImage,
        })
      })

      const userBillingAddress = await BillingAddressModel.query()
        .where({ userId: order[0].userId })
        .innerJoin("users", "billing_address.userId", "=", "users.id")
        .select("billing_address.*", "users.firstName", "users.lastName")
      const userDeliveryAddress = await AddressModel.query().where({
        id: order[0].addressId,
      })

      res.send({
        result: {
          order,
          allProductsOrder,
          userBillingAddress,
          userDeliveryAddress,
        },
      })
    },
  ],
  PATCH: [
    validate({
      query: {
        numberOrder: stringValidator.required(),
      },
      body: {
        productId: idValidator.required(),
        quantity: integerValidator.required(),
      },
    }),
    async ({
      locals: {
        query: { numberOrder },
        body: { productId, quantity },
      },
      res,
    }) => {
      const order = await OrderModel.query()
        .where({ numberOrder: numberOrder })
        .withGraphFetched("product")
        .modifyGraph("product", (builder) => {
          builder.where({ productId: productId })
        })
        .select("orders.id")

      if (!order) {
        res.status(401).send({ error: "No orders found" })

        return
      }

      await RelOrderProductModel.query()
        .where({ orderId: order[0].id })
        .where({ productId: productId })
        .patch({ quantity: quantity })

      const newPrice = await OrderModel.query()
        .withGraphJoined("product")
        .sum(db.raw("?? * ??", ["product_join.quantity", "product.price"]))
        .where({ numberOrder: numberOrder })
        .groupBy("orders.id", "product:id")

      const priceUpdated = await OrderModel.query().updateAndFetchById(
        order[0].id,
        {
          price: newPrice[0].sum.toFixed(2),
          price_formatted: newPrice[0].sum.toFixed(2).toString(),
          amount_tva: (newPrice[0].sum * 0.21).toFixed(2),
          amount_tva_formatted: (newPrice[0].sum * 0.21).toFixed(2).toString(),
        }
      )

      res.send({
        result: {
          priceUpdated,
        },
      })
    },
  ],
  DELETE: [
    validate({
      query: {
        numberOrder: stringValidator.required(),
        productId: idValidator.required(),
      },
    }),
    async ({
      locals: {
        query: { numberOrder, productId },
      },
      res,
    }) => {
      const order = await OrderModel.query()
        .where({ numberOrder: numberOrder })
        .withGraphFetched("product")
        .modifyGraph("product", (builder) => {
          builder.where({ productId: productId })
        })
        .select("orders.id")

      if (!order) {
        res.status(401).send({ error: "No orders found" })

        return
      }

      let priceUpdated

      await RelOrderProductModel.query()
        .delete()
        .where({ orderId: order[0].id })
        .where({ productId: productId })

      const newPrice = await OrderModel.query()
        .withGraphJoined("product")
        .sum(db.raw("?? * ??", ["product_join.quantity", "product.price"]))
        .where({ numberOrder: numberOrder })
        .groupBy("orders.id", "product:id")

      if (newPrice[0].sum === null) {
        priceUpdated = await OrderModel.query().updateAndFetchById(
          order[0].id,
          {
            price: (0).toFixed(2),
            price_formatted: (0).toFixed(2).toString(),
            amount_tva: (0).toFixed(2),
            amount_tva_formatted: (0).toFixed(2).toString(),
            status: "Cancelled",
          }
        )
      } else {
        priceUpdated = await OrderModel.query().updateAndFetchById(
          order[0].id,
          {
            price: newPrice[0].sum.toFixed(2),
            price_formatted: newPrice[0].sum.toFixed(2).toString(),
            amount_tva: (newPrice[0].sum * 0.21).toFixed(2),
            amount_tva_formatted: (newPrice[0].sum * 0.21)
              .toFixed(2)
              .toString(),
            status: "On standby",
          }
        )
      }

      res.send({
        result: {
          priceUpdated,
        },
      })
    },
  ],
})

export default handler
