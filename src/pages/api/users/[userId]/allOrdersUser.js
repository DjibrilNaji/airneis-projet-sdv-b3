import OrderModel from "@/api/db/models/OrderModel"
import validate from "@/api/middlewares/validate.js"
import mw from "@/api/mw.js"
import { idValidator } from "@/validators"
import knex from "knex"
import config from "@/api/config"

const db = knex(config.db)

const handler = mw({
  GET: [
    validate({
      query: {
        userId: idValidator.required(),
      },
    }),
    async ({
      locals: {
        query: { userId },
      },
      res,
    }) => {
      const orders = await OrderModel.query()
        .where({ userId: userId })
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
        .select("orders.numberOrder", "orders.status", "orders.createdAt")
        .sum("rel_order_product.quantity as quantity")
        .sum(
          db.raw("?? * ??", ["rel_order_product.quantity", "products.price"])
        )
        .groupBy("orders.numberOrder", "orders.status", "orders.createdAt")

      if (!orders) {
        res.status(401).send({ error: "No orders found" })

        return
      }

      res.send({ result: { orders } })
    },
  ],
})

export default handler
