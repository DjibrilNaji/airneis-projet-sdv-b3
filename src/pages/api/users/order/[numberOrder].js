import OrderModel from "@/api/db/models/OrderModel"
import validate from "@/api/middlewares/validate.js"
import mw from "@/api/mw.js"
import { idValidator, integerValidator, stringValidator } from "@/validators"
import knex from "knex"
import config from "@/api/config"
import RelOrderProductModel from "@/api/db/models/RelOrderProduct"
import s3 from "@@/configAWS.js"
import BillingAddressModel from "@/api/db/models/BillingAddressModel"
import AddressModel from "@/api/db/models/AddressModel"

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
        .innerJoin(
          "rel_order_product",
          "orders.id",
          "=",
          "rel_order_product.orderId"
        )
        .innerJoin(
          "products",
          "products.id",
          "=",
          "rel_order_product.productId"
        )
        .select(
          "orders.id",
          "orders.userId",
          "orders.addressId",
          "orders.numberOrder",
          "orders.status",
          "orders.createdAt"
        )
        .sum(
          db.raw("?? * ??", ["rel_order_product.quantity", "products.price"])
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

      let orderId = null
      let userId = null
      let addressId = null
      order.map((odr) => {
        ;(orderId = odr.id), (userId = odr.userId), (addressId = odr.addressId)
      })
      const allProductsOrder = await RelOrderProductModel.query()
        .where({ orderId: orderId })
        .innerJoin(
          "products",
          "products.id",
          "=",
          "rel_order_product.productId"
        )
        .innerJoin(
          "image_product",
          "products.id",
          "=",
          "image_product.productId"
        )
        .select(
          "products.id",
          "products.name",
          "products.description",
          "products.price",
          "rel_order_product.quantity",
          "products.quantity as quantityProduct",
          "image_product.urlImage"
        )
        .distinctOn("products.id")

      allProductsOrder.map((product) => {
        product.urlImage = s3.getSignedUrl("getObject", {
          Bucket: "airness-matd",
          Key: product.urlImage,
        })
      })

      const userBillingAddress = await BillingAddressModel.query()
        .where({ userId: userId })
        .innerJoin("users", "billing_address.userId", "=", "users.id")
        .select("billing_address.*", "users.firstName", "users.lastName")
      const userDeliveryAddress = await AddressModel.query().where({
        id: addressId,
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
        .where({ productId: productId })
        .innerJoin(
          "rel_order_product",
          "orders.id",
          "=",
          "rel_order_product.orderId"
        )
        .select("orders.id")

      if (!order) {
        res.status(401).send({ error: "No orders found" })

        return
      }

      let orderId
      order.map((o) => (orderId = o.id))

      await RelOrderProductModel.query()
        .where({ orderId: orderId })
        .where({ productId: productId })
        .patch({ quantity: quantity })

      const priceUpdated = await OrderModel.query()
        .where({ numberOrder: numberOrder })
        .innerJoin(
          "rel_order_product",
          "orders.id",
          "=",
          "rel_order_product.orderId"
        )
        .innerJoin(
          "products",
          "products.id",
          "=",
          "rel_order_product.productId"
        )
        .sum(
          db.raw("?? * ??", ["rel_order_product.quantity", "products.price"])
        )

      res.send({
        result: {
          priceUpdated,
        },
      })
    },
  ],
})

export default handler
