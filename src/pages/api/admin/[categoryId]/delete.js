import validate from "@/api/middlewares/validate.js"
import mw from "@/api/mw.js"
import { idValidator } from "@/validators"
import CategoryModel from "@/api/db/models/CategoryModel"
import { NotFoundError } from "@/api/errors"

const handler = mw({
  PATCH: [
    validate({
      query: {
        categoryId: idValidator.required(),
      },
    }),
    async ({
      locals: {
        query: { categoryId },
      },
      res,
    }) => {
      const category = await CategoryModel.query().findById(categoryId)

      if (!category) {
        throw new NotFoundError()
      }

      const categoryDeleted = await CategoryModel.query()
        .patch({ isDelete: true })
        .where({ id: categoryId })
        .returning("*")

      res.send({
        result: categoryDeleted,
      })
    },
  ],
})

export default handler
