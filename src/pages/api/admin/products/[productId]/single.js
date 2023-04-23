import ProductModel from "@/api/db/models/ProductModel"
import { NotFoundError } from "@/api/errors"
import validate from "@/api/middlewares/validate.js"
import s3 from "@@/configAWS.js"
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
      const product = await ProductModel.query()
        .where({ id: productId })
        .withGraphFetched("image")

      if (!product) {
        throw new NotFoundError()
      }

      product[0].image.map((imageProduct) => {
        imageProduct.urlImage = s3.getSignedUrl("getObject", {
          Bucket: "airness-matd",
          Key: imageProduct.urlImage,
        })
      })

      res.send({ result: { product } })
    },
  ],
})

export default handler
