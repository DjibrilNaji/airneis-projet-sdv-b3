import ContactModel from "@/api/db/models/ContactModel"
import validate from "@/api/middlewares/validate.js"
import mw from "@/api/mw.js"
import {
  stringValidator,
  emailValidator,
  limitValidator,
  pageValidator,
  orderValidator,
} from "@/validators.js"

const handler = mw({
  POST: [
    validate({
      body: {
        email: emailValidator.required(),
        subject: stringValidator,
        message: stringValidator.required(),
      },
    }),
    async ({
      locals: {
        body: { email, subject, message },
      },
      res,
    }) => {
      await ContactModel.query().insert({
        email,
        subject,
        message,
      })

      res.send({ result: true })
    },
  ],
  GET: [
    validate({
      query: {
        limit: limitValidator,
        page: pageValidator,
        order: orderValidator.default("asc"),
        sortColumn: stringValidator.default("id"),
      },
    }),
    async ({
      locals: {
        query: { limit, page, order, sortColumn, searchTerm },
      },
      res,
    }) => {
      const searchTermModified = `%${searchTerm}%`

      const query = ContactModel.query()

      if (searchTerm) {
        query
          .whereRaw("UPPER(email) LIKE ?", [searchTermModified.toUpperCase()])
          .modify("paginate", limit, page)
      } else {
        query.modify("paginate", limit, page)
      }

      if (!query) {
        res.send({ result: "An error occurred while retrieving contacts" })
      }

      const [countResult] = await query
        .clone()
        .clearSelect()
        .limit(1)
        .offset(0)
        .count()

      const count = Number.parseInt(countResult.count, 10)

      const contacts = await query.orderBy(sortColumn, order)

      res.send({
        result: {
          contacts,
          meta: {
            count,
          },
        },
      })
    },
  ],
})

export default handler
