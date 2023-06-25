import RelProductMaterialModel from "@/api/db/models/RelProductMaterialModel"
import validate from "@/api/middlewares/validate"
import mw from "@/api/mw.js"
import { idValidator } from "@/validators"

const handler = mw({
  GET: [
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
    }) => {
      const relMaterialProduct = await RelProductMaterialModel.query().where({
        productId: productId,
      })

      if (!relMaterialProduct) {
        res.send({ result: "An error occurred while retrieving materials" })
      }

      res.send({
        result: relMaterialProduct,
      })
    },
  ],
})

export default handler
