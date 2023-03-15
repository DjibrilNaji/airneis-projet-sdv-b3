import OrderModel from "@/api/db/models/OrderModel"
import validate from "@/api/middlewares/validate.js"
import mw from "@/api/mw.js"
import { stringValidator } from "@/validators"
import knex from "knex"
import config from "@/api/config"
import RelOrderProductModel from "@/api/db/models/RelOrderProduct"
import s3 from "@@/configAWS.js"


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
        .select("orders.id", "orders.numberOrder", "orders.status", "orders.createdAt")
        .sum(
          db.raw("?? * ??", ["rel_order_product.quantity", "products.price"])
        )
        .groupBy("orders.id", "orders.numberOrder", "orders.status", "orders.createdAt")

      if (!order) {
        res.status(401).send({ error: "No orders found" })

        return
      }

      let orderId = null
      order.map((odr) =>   orderId = odr.id)
      const allProductsOrder = await RelOrderProductModel.query().where({orderId: orderId}).innerJoin(
        "products",
        "products.id",
        "=",
        "rel_order_product.productId"
      )
      .innerJoin("imageProduct", "products.id", "=", "imageProduct.productId")
      .select("products.id", "products.name", "products.description", "products.price", "rel_order_product.quantity", "imageProduct.urlImage")
      .distinctOn("products.id")

      allProductsOrder.map((product) => {
        product.urlImage = s3.getSignedUrl("getObject", {
          Bucket: "airness-matd",
          Key: product.urlImage,
        })
      })

      

      res.send({ result: { order, allProductsOrder } })
    },
  ],
})

export default handler
