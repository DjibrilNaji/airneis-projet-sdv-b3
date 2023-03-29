import mw from "@/api/mw.js"
import UserModel from "@/api/db/models/UserModel.js"
import validate from "@/api/middlewares/validate.js"
import { limitValidator, orderValidator, pageValidator } from "@/validators.js"

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
        query: { limit, page, order, sortColumn },
      },
      res,
    }) => {
      const query = UserModel.query().modify("paginate", limit, page)

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

      const users = await query.orderBy(sortColumn, order)

      res.send({
        result: {
          users,
          meta: {
            count,
          },
        },
      })
    },
  ],
})

export default handler
