import OrderModel from "@/api/db/models/OrderModel"
import RelOrderProductModel from "@/api/db/models/RelOrderProductModel"
import { NotFoundError } from "@/api/errors"
import validate from "@/api/middlewares/validate.js"
import mw from "@/api/mw.js"
import { idValidator } from "@/validators"
import s3 from "@@/configAWS"

const handler = mw({
  GET: [
    validate({
      query: {
        orderId: idValidator.required(),
      },
    }),
    async ({
      locals: {
        query: { orderId },
      },
      res,
    }) => {
      const order = await OrderModel.query()
        .findOne({ id: orderId })
        .withGraphFetched("address")

      if (!order) {
        throw new NotFoundError()
      }

      const products = await RelOrderProductModel.query()
        .where({
          orderId: orderId,
        })
        .withGraphFetched("product")
        .modifyGraph("product", (builder) => {
          builder.withGraphFetched("image").distinctOn("products.id")
        })

      if (!products) {
        throw new NotFoundError()
      }

      products.map((product) =>
        product.product.image.map(
          (item) =>
            (item.urlImage = s3.getSignedUrl("getObject", {
              Bucket: "airness-matd",
              Key: item.urlImage,
            }))
        )
      )

      res.send({
        order,
        products,
      })
    },
  ],
})
export default handler
