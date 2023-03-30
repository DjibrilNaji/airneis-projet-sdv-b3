import mw from "@/api/mw.js"
import CategoryModel from "@/api/db/models/CategoryModel"
import validate from "@/api/middlewares/validate"
import { stringValidator } from "@/validators"

const handler = mw({
  GET: [
    async ({ res }) => {
      const categories = await CategoryModel.query()

      if (!categories) {
        res.send({ result: "An error occurred while retrieving categories" })
      }

      res.send({
        result: {
          categories,
        },
      })
    },
  ],

  POST: [
    validate({
      body: {
        name: stringValidator.required(),
        description: stringValidator.required(),
        urlImage: stringValidator.required(),
      },
    }),
    async ({
      locals: {
        body: { name, description, urlImage },
      },
      res,
    }) => {
      const category = await CategoryModel.query().findOne({ name })

      if (category) {
        res.send({ result: "Category already exists" })

        return
      }

      await CategoryModel.query().insertAndFetch({
        name,
        description,
        urlImage,
      })

      res.send({ result: true })
    },
  ],
})

export default handler
