import mw from "@/api/mw.js"
import ProductModel from "@/api/db/models/ProductModel"
import CategoryModel from "@/api/db/models/CategoryModel"
import s3 from "@@/configAWS.js"
import ImageHomePageModel from "@/api/db/models/ImageHomePageModel"

const handler = mw({
  GET: [
    async ({ res }) => {
      const imageHomePage = await ImageHomePageModel.query()
      const categories = await CategoryModel.query()
      const products = await ProductModel.query()
        .innerJoin("imageProduct", "products.id", "=", "imageProduct.productId")
        .select(
          "products.id",
          "products.name",
          "products.price",
          "products.quantity",
          "products.highlander",
          "imageProduct.urlImage"
        )

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

      if (!products) {
        res.send({ result: "An error occurred while retrieving products" })
      }

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
