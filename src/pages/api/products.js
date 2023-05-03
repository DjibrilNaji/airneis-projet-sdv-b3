import mw from "@/api/mw.js"
import ProductModel from "@/api/db/models/ProductModel"
import s3 from "@@/configAWS.js"
import ImageHomePageModel from "@/api/db/models/ImageHomePageModel"

const handler = mw({
  GET: [
    async ({ res }) => {
      const imageHomePage = await ImageHomePageModel.query().where({
        display: true,
      })

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
          "products.quantity",
          "products.highlander",

          "image_product.urlImage"
        )

        .distinctOn("image_product.productId")

      if (!products) {
        res.send({ result: "An error occurred while retrieving products" })
      }

      products.map((product) => {
        product.urlImage = s3.getSignedUrl("getObject", {
          Bucket: "airness-matd",
          Key: product.urlImage,
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
          imageHomePage,
          products,
        },
      })
    },
  ],
})

export default handler
