import ImageProductModel from "@/api/db/models/ImageProductModel"
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
      const product = await ProductModel.query().where({ slug })

      if (!product) {
        throw new NotFoundError()
      }

      const imageProduct = await ImageProductModel.query().where({
        productId: product[0].id,
      })

      if (!imageProduct) {
        throw new NotFoundError()
      }

      imageProduct.map((image) => {
        image.urlImage = s3.getSignedUrl("getObject", {
          Bucket: "airness-matd",
          Key: image.urlImage,
        })
      })

      const productsInCategory = await ProductModel.query()
        .where({
          categoryId: product[0].categoryId,
        })
        .whereNot({ slug: slug })

      if (!productsInCategory) {
        throw new NotFoundError()
      }

      const imageProductsInCategory = []

      for (const product of productsInCategory) {
        const images = await ImageProductModel.query().where({
          productId: product.id,
        })

        if (!images) {
          throw new NotFoundError()
        }

        for (const image of images) {
          imageProductsInCategory.push(image)
        }
      }

      imageProductsInCategory.map((image) => {
        image.urlImage = s3.getSignedUrl("getObject", {
          Bucket: "airness-matd",
          Key: image.urlImage,
        })
      })

      res.send({
        result: {
          product,
          imageProduct,
          productsInCategory,
          imageProductsInCategory,
        },
      })
    },
  ],
})

export default handler
