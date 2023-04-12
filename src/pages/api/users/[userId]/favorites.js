import validate from "@/api/middlewares/validate.js"
import mw from "@/api/mw.js"
import { idValidator } from "@/validators"
import {
  InvalidAccessError,
  InvalidSessionError,
  NotFoundError,
} from "@/api/errors"
import config from "@/api/config"
import jsonwebtoken from "jsonwebtoken"
import FavoriteModel from "@/api/db/models/FavoriteModel"
import s3 from "@@/configAWS"

const handler = mw({
  GET: [
    validate({
      query: {
        userId: idValidator.required(),
      },
    }),
    async ({
      locals: {
        query: { userId },
      },
      req,
      res,
    }) => {
      const { authorization } = req.headers

      if (!authorization) {
        throw new InvalidSessionError()
      } else {
        const { payload } = jsonwebtoken.verify(
          authorization.slice(7),
          config.security.jwt.secret
        )

        req.session = payload
      }

      const {
        session: { user: sessionUser },
      } = req

      if (sessionUser.id !== userId) {
        throw new InvalidAccessError()
      }

      const favoritesWithImages = await FavoriteModel.query()
        .innerJoin("products", "favorites.productId", "=", "products.id")
        .where({ isDelete: false })
        .innerJoin(
          "image_product",
          "products.id",
          "=",
          "image_product.productId"
        )
        .select(
          "products.name",
          "products.description",
          "products.slug",
          "products.price",
          "products.quantity",
          "image_product.urlImage"
        )
        .distinctOn("products.id")

      if (!favoritesWithImages) {
        throw new NotFoundError()
      }

      favoritesWithImages.map((product) => {
        product.urlImage = s3.getSignedUrl("getObject", {
          Bucket: "airness-matd",
          Key: product.urlImage,
        })
      })

      res.send({ result: favoritesWithImages })
    },
  ],
})

export default handler
