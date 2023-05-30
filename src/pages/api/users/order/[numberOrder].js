import OrderModel from "@/api/db/models/OrderModel"
import validate from "@/api/middlewares/validate.js"
import mw from "@/api/mw.js"
import { stringValidator } from "@/validators"
import s3 from "@@/configAWS.js"
import BillingAddressModel from "@/api/db/models/BillingAddressModel"
import AddressModel from "@/api/db/models/AddressModel"
import ProductModel from "@/api/db/models/ProductModel"

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
          "orders.price",
          "orders.amount_tva"
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
          "products.price",
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
})

export default handler
