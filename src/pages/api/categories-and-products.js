import mw from "@/api/mw.js"
import ProductModel from "@/api/db/models/ProductModel"
import CategoryModel from "@/api/db/models/CategoryModel"
import s3 from "@@/configAWS.js"
import ImageHomePageModel from "@/api/db/models/ImageHomePageModel"

const handler = mw({
  GET: [
    async ({ res }) => {
      const imageHomePage = await ImageHomePageModel.query().where({
        display: true,
      })
      const categories = await CategoryModel.query()

      if (!categories) {
        res.send({ result: "An error occurred while retrieving categories" })
      }

      const products = await ProductModel.query()
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
          "products.stock",
          "products.highlander",
          "image_product.urlImage"
        )
        .distinctOn("image_product.productId")
        .where({ highlander: true })

      if (!products) {
        res.send({ result: "An error occurred while retrieving products" })
      }

      products.map((product) => {
        product.urlImage = s3.getSignedUrl("getObject", {
          Bucket: "airness-matd",
          Key: product.urlImage,
        })
      })

      categories.map((category) => {
        category.urlImage = s3.getSignedUrl("getObject", {
          Bucket: "airness-matd",
          Key: category.urlImage,
        })
      })

      imageHomePage.map((image) => {
        image.urlImage = s3.getSignedUrl("getObject", {
          Bucket: "airness-matd",
          Key: image.urlImage,
        })
      })

      res.send({
        result: {
          categories,
          products,
          imageHomePage,
        },
      })
    },
  ],
})

export default handler
