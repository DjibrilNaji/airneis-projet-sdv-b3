import mw from "@/api/mw.js"
import validate from "@/api/middlewares/validate.js"
import { limitValidator, orderValidator, pageValidator } from "@/validators.js"
import CategoryModel from "@/api/db/models/CategoryModel"

const handler = mw({
  GET: [
    validate({
      query: {
        limit: limitValidator.nullable(),
        page: pageValidator.nullable(),
        order: orderValidator.default("asc").nullable(),
      },
    }),
    async ({
      locals: {
        query: { limit, page, order, sortColumn, searchTerm },
      },
      res,
    }) => {
      const searchTermModified = `%${searchTerm}%`

      const query = CategoryModel.query()

      if (searchTerm) {
        query
          .whereRaw("UPPER(name) LIKE ?", [searchTermModified.toUpperCase()])
          .modify("paginate", limit, page)
      } else {
        query.modify("paginate", limit, page)
      }

      if (!query) {
        res.send({ result: "An error occured while retrieving categories" })
      }

      const [countResult] = await query
        .clone()
        .clearSelect()
        .limit(1)
        .offset(0)
        .count()

      const count = Number.parseInt(countResult.count, 10)

      const categories = await query.orderBy(sortColumn, order)

      res.send({
        result: {
          categories,
          meta: {
            count,
          },
        },
      })
    },
  ],
})

export default handler
