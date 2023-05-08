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
        .where({
          userId: userId,
        })
        .withGraphFetched("product")
        .modifyGraph("product", (builder) => {
          builder.withGraphFetched("image")
        })

      if (!favoritesWithImages) {
        throw new NotFoundError()
      }

      favoritesWithImages.map((products) =>
        products.product.image.map(
          (img) =>
            (img.urlImage = s3.getSignedUrl("getObject", {
              Bucket: "airness-matd",
              Key: img.urlImage,
            }))
        )
      )
      res.send({ result: favoritesWithImages })
    },
  ],
  DELETE: [
    validate({
      query: {
        userId: idValidator.required(),
        favoriteId: idValidator.required(),
      },
    }),
    async ({
      locals: {
        query: { favoriteId, userId },
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

      const favorite = await FavoriteModel.query()
        .findOne({ productId: favoriteId })
        .where({ userId: userId })

      if (!favorite) {
        throw new NotFoundError()
      }

      const favoriteDeleted = await FavoriteModel.query()
        .delete()
        .where({ productId: favoriteId })
        .where({ userId: userId })
        .returning("*")

      res.send({
        result: favoriteDeleted,
      })
    },
  ],
  POST: [
    validate({
      query: {
        userId: idValidator.required(),
        productId: idValidator.required(),
      },
    }),
    async ({
      locals: {
        query: { userId, productId },
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

      const favorite = await FavoriteModel.query()
        .findOne({ userId: userId })
        .where({ productId: productId })

      if (favorite) {
        res.send({ result: "OK" })

        return
      }

      await FavoriteModel.query().insert({
        userId,
        productId,
      })

      res.send({ result: "OK" })
    },
  ],
})

export default handler
