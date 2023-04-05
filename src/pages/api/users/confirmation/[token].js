import UserModel from "@/api/db/models/UserModel"
import validate from "@/api/middlewares/validate.js"
import mw from "@/api/mw.js"
import jsonwebtoken, { JsonWebTokenError } from "jsonwebtoken"
import config from "@/api/config"

const handler = mw({
  PATCH: [
    validate({}),
    async ({
      locals: {
        query: { token },
      },
      res,
    }) => {
      try {
        const { payload } = jsonwebtoken.verify(
          token,
          config.security.jwt.secret
        )
        const { user } = payload

        const userFind = await UserModel.query().findOne({ email: user.email })

        if (!userFind) {
          res.status(401).send({ error: "No user found" })

          return
        }

        await UserModel.query()
          .patch({ validate: true })
          .where({ email: user.email })

        res.send({ result: true, msg: "user validate" })
      } catch {
        throw new JsonWebTokenError()
      }
    },
  ],
})

export default handler
