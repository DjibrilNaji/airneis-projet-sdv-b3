import CategoryModel from "@/api/db/models/CategoryModel"
import { InvalidAccessError, NotFoundError } from "@/api/errors"
import validate from "@/api/middlewares/validate.js"
import mw from "@/api/mw.js"
import {
  boolValidator,
  idValidator,
  stringValidator,
  urlSlugValidator,
} from "@/validators"

const handler = mw({
  GET: [
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
      req,
    }) => {
      const {
        session: { user: sessionUser },
      } = req

      if (sessionUser.isAdmin !== true) {
        throw new InvalidAccessError()
      }

      const category = await CategoryModel.query().where({ id: categoryId })

      if (!category) {
        throw new NotFoundError()
      }

      res.send({ result: category })
    },
  ],
  PATCH: [
    validate({
      query: {
        categoryId: idValidator.required(),
      },
      body: {
        nameCategory: stringValidator,
        descriptionCategory: stringValidator,
        isDelete: boolValidator,
        slug: urlSlugValidator,
      },
    }),
    async ({
      locals: {
        query: { categoryId },
        body: { name, description, slug, isDelete },
      },
      res,
      req,
    }) => {
      const {
        session: { user: sessionUser },
      } = req

      if (sessionUser.isAdmin !== true) {
        throw new InvalidAccessError()
      }

      const category = await CategoryModel.query().findOne({ id: categoryId })

      if (!category) {
        throw new NotFoundError()
      }

      const newCategory = await CategoryModel.query().updateAndFetchById(
        categoryId,
        {
          ...(name ? { name } : {}),
          ...(description ? { description } : {}),
          ...(slug ? { slug } : {}),
          ...(isDelete ? { isDelete } : {}),
        }
      )

      res.send({ result: newCategory })
    },
  ],
})

export default handler
