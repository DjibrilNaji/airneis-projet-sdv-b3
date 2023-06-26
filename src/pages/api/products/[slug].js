import ProductModel from "@/api/db/models/ProductModel"
import { NotFoundError } from "@/api/errors"
import validate from "@/api/middlewares/validate.js"
import mw from "@/api/mw.js"
import { urlSlugValidator } from "@/validators"
import s3 from "@@/configAWS"

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
      const product = await ProductModel.query()
        .findOne({ slug: slug })
        .where({ isDelete: false })
        .withGraphFetched("image")
        .withGraphFetched("category")
        .withGraphFetched("materials")

      if (!product) {
        throw new NotFoundError()
      }

      product.image.map(
        (product) =>
          (product.urlImage = s3.getSignedUrl("getObject", {
            Bucket: "airness-matd",
            Key: product.urlImage,
          }))
      )

      const productsInCategory = await ProductModel.query()
        .where({
          categoryId: product.category[0].id,
        })
        .whereNot({ slug: slug })
        .withGraphFetched("image")

      if (!productsInCategory) {
        throw new NotFoundError()
      }

      productsInCategory.map((products) =>
        products.image.map(
          (img) =>
            (img.urlImage = s3.getSignedUrl("getObject", {
              Bucket: "airness-matd",
              Key: img.urlImage,
            }))
        )
      )

      const randomProducts = []

      const maxProducts = Math.min(6, productsInCategory.length)

      while (randomProducts.length < maxProducts) {
        const randomIndex = Math.floor(
          Math.random() * productsInCategory.length
        )

        const randomProduct = productsInCategory[randomIndex]

        if (!randomProducts.includes(randomProduct)) {
          randomProducts.push(randomProduct)
        }
      }

      res.send({
        result: {
          product,
          randomProducts,
        },
      })
    },
  ],
})

export default handler
