import UserModel from "@/api/db/models/UserModel"
import validate from "@/api/middlewares/validate.js"
import mw from "@/api/mw.js"
import { idValidator } from "@/validators"
import { InvalidAccessError, InvalidSessionError } from "@/api/errors"
import config from "@/api/config"
import jsonwebtoken from "jsonwebtoken"

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

      const user = await UserModel.query()
        .findById(userId)
        .select(
          "users.id",
          "users.firstName",
          "users.userName",
          "users.lastName",
          "users.email"
        )

      if (!user) {
        res.status(401).send({ error: "No user found" })

        return
      }

      res.send({ result: user })
    },
  ],
})

export default handler
