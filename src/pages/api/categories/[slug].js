import CategoryModel from "@/api/db/models/CategoryModel.js"
import ProductModel from "@/api/db/models/ProductModel"
import validate from "@/api/middlewares/validate.js"
import mw from "@/api/mw.js"
import { urlSlugValidator } from "@/validators"
import s3 from "@@/configAWS.js"

const handler = mw({
  GET: [
    validate({
      query: {
        slug: urlSlugValidator.required(),
      },
    }),
    async ({
      locals: {
        query: { slug },
      },
      res,
    }) => {
      const category = await CategoryModel.query().where({ slug: slug })

      if (!category) {
        res.status(401).send({ error: "No category found" })

        return
      }

      const products = await ProductModel.query()
        .where({
          categoryId: category[0].id,
        })
        .innerJoin(
          "image_product",
          "products.id",
          "=",
          "image_product.productId"
        )
        .select(
          "products.id",
          "products.name",
          "products.slug",
          "products.price",
          "products.quantity",
          "image_product.urlImage"
        )
        .distinctOn("products.id")

      products.map((product) => {
        product.urlImage = s3.getSignedUrl("getObject", {
          Bucket: "airness-matd",
          Key: product.urlImage,
        })
      })

      const imageUrl = category.map((cat) => cat.urlImage)

      const data = s3.getSignedUrl("getObject", {
        Bucket: "airness-matd",
        Key: imageUrl.toString(),
      })

      res.send({ result: { category, data, products } })
    },
  ],
})

export default handler
