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

      const products = await ProductModel.query().withGraphFetched("image")

      if (!products) {
        res.send({ result: "An error occurred while retrieving products" })
      }

      products.map((product) =>
        product.image.map(
          (image) =>
            (image.urlImage = s3.getSignedUrl("getObject", {
              Bucket: "airness-matd",
              Key: image.urlImage,
            }))
        )
      )

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
