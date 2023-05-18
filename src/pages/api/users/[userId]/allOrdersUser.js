import OrderModel from "@/api/db/models/OrderModel"
import validate from "@/api/middlewares/validate.js"
import mw from "@/api/mw.js"
import { idValidator } from "@/validators"

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
        .orderBy("createdAt", "desc")
        .withGraphJoined("product")
        .select(
          "orders.numberOrder",
          "orders.status",
          "orders.createdAt",
          "orders.price_formatted"
        )
        .sum("product_join.quantity as quantity")
        .groupBy(
          "orders.numberOrder",
          "orders.status",
          "orders.createdAt",
          "orders.price_formatted",
          "orders.id",
          "product.id"
        )

      if (!orders) {
        res.status(401).send({ error: "No orders found" })

        return
      }

      res.send({ result: { orders } })
    },
  ],
})

export default handler
