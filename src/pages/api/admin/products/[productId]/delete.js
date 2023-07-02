import validate from "@/api/middlewares/validate.js"
import mw from "@/api/mw.js"
import { idValidator } from "@/validators"
import { InvalidAccessError, NotFoundError } from "@/api/errors"
import ProductModel from "@/api/db/models/ProductModel"

const handler = mw({
  PATCH: [
    validate({
      query: {
        productId: idValidator.required(),
      },
    }),
    async ({
      locals: {
        query: { productId },
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

      const product = await ProductModel.query().findById(productId)

      if (!product) {
        throw new NotFoundError()
      }

      const productDeleted = await ProductModel.query()
        .patch({ isDelete: true })
        .where({ id: productId })
        .returning("*")

      res.send({
        result: productDeleted,
      })
    },
  ],
})

export default handler
