import CategoryModel from "@/api/db/models/CategoryModel"
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
      const product = await ProductModel.query()
        .findOne({ slug: slug })
        .where({ isDelete: false })

      if (!product) {
        throw new NotFoundError()
      }

      const imageProduct = await ImageProductModel.query().where({
        productId: product.id,
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

      const productCategory = await CategoryModel.query().where({
        id: product.categoryId,
      })

      const productsInCategory = await ProductModel.query()
        .where({
          categoryId: productCategory[0].id,
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

      const randomProducts = []
      const randomMainImage = []

      const maxProducts = Math.min(6, productsInCategory.length)

      while (randomProducts.length < maxProducts) {
        const randomIndex = Math.floor(
          Math.random() * productsInCategory.length
        )
        const randomProduct = productsInCategory[randomIndex]

        if (!randomProducts.includes(randomProduct)) {
          randomProducts.push(randomProduct)

          const image = imageProductsInCategory.find(
            (image) => image.productId === randomProduct.id && image.isMain
          )

          if (image) {
            randomMainImage.push({
              productId: randomProduct.id,
              urlImage: image.urlImage,
            })
          }
        }
      }

      res.send({
        result: {
          product,
          imageProduct,
          productCategory,
          randomProducts,
          randomMainImage,
        },
      })
    },
  ],
})

export default handler
