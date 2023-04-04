import mw from "@/api/mw.js"
import validate from "@/api/middlewares/validate.js"
import { limitValidator, orderValidator, pageValidator } from "@/validators.js"
import ProductModel from "@/api/db/models/ProductModel"

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
        query: { limit, page, order, sortColumn, searchTerm },
      },
      res,
    }) => {
      const searchTermModified = `%${searchTerm}%`

      const query = ProductModel.query()

      if (searchTerm) {
        query
          .whereRaw("UPPER(name) LIKE ?", [searchTermModified.toUpperCase()])
          .modify("paginate", limit, page)
      } else {
        query.modify("paginate", limit, page)
      }

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

      const products = await query.orderBy(sortColumn, order)

      res.send({
        result: {
            products,
          meta: {
            count,
          },
        },
      })
    },
  ],
})

export default handler
