import UserModel from "@/api/db/models/UserModel"
import validate from "@/api/middlewares/validate.js"
import mw from "@/api/mw.js"
import { passwordValidator, stringValidator } from "@/validators"
import { NotFoundError } from "@/api/errors"
import config from "@/api/config"
import jsonwebtoken from "jsonwebtoken"
import hashPassword from "@/api/db/hashPassword"

const handler = mw({
  PATCH: [
    validate({
      body: {
        token: stringValidator,
        password: passwordValidator,
      },
    }),
    async ({
      locals: {
        body: { token, password },
      },
      res,
    }) => {
        const { payload } = jsonwebtoken.verify(
          token,
          config.security.jwt.secret
        )

    const {user: {email}} = payload

      const user = await UserModel.query().findOne({email}).where({isDelete: false}).where({validate: true})

      if (!user) {
        throw new NotFoundError()
      }

      const [passwordHash, passwordSalt] = await hashPassword(password)


    await UserModel.query().updateAndFetchById(user.id, {
        passwordHash,
        passwordSalt
      })

      res.send({ result: "ok" })
    },
  ],
})

export default handler
