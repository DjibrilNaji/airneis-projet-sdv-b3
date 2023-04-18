import OrderModel from "@/api/db/models/OrderModel"
import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import { limitValidator, orderValidator, pageValidator } from "@/validators"

const handler = mw({
  GET: [
    validate({
      query: {
        limit: limitValidator,
        page: pageValidator,
        order: orderValidator.default("asc"),
      },
    }),
    async ({
      locals: {
        query: { limit, page, order },
      },
      res,
    }) => {
      const query = OrderModel.query()
        .innerJoin("users", "orders.userId", "=", "users.id")
        .select(
          "orders.id",
          "orders.numberOrder",
          "orders.status",
          "orders.price_formatted",
          "users.email"
        )
        .modify("paginate", limit, page)

      if (!query) {
        res.send({ result: "An error occurred while retrieving users" })
      }

      const [countResult] = await query
        .clone()
        .clearSelect()
        .limit(1)
        .offset(0)
        .count()

      const count = Number.parseInt(countResult.count, 10)

      const orders = await query.orderBy("id", order)

      res.send({
        result: {
          orders,
          meta: {
            count,
          },
        },
      })
    },
  ],
})

export default handler
