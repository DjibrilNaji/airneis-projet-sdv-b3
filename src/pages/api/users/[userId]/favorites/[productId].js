import validate from "@/api/middlewares/validate.js"
import mw from "@/api/mw.js"
import { idValidator } from "@/validators"
import { InvalidAccessError, InvalidSessionError } from "@/api/errors"
import config from "@/api/config"
import jsonwebtoken from "jsonwebtoken"
import FavoriteModel from "@/api/db/models/FavoriteModel"

const handler = mw({
  GET: [
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

      const favorites = await FavoriteModel.query()
        .where({ userId: userId })
        .where({ productId: productId })

      res.send({ result: favorites })
    },
  ],
})

export default handler
