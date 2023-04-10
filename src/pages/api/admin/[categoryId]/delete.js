import validate from "@/api/middlewares/validate.js"
import mw from "@/api/mw.js"
import { idValidator } from "@/validators"
import CategoryModel from "@/api/db/models/CategoryModel"
import { NotFoundError } from "@/api/errors"
import ProductModel from "@/api/db/models/ProductModel"

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

      await ProductModel.query()
        .patch({ isDelete: true })
        .where({ categoryId: categoryId })

      res.send({
        result: categoryDeleted,
      })
    },
  ],
})

export default handler
