import config from "@/api/config.js"
import UserModel from "@/api/db/models/UserModel.js"
import validate from "@/api/middlewares/validate.js"
import mw from "@/api/mw.js"
import { emailValidator, stringValidator } from "@/validators.js"
import jsonwebtoken from "jsonwebtoken"

const handler = mw({
  POST: [
    validate({
      body: {
        email: emailValidator.required(),
        password: stringValidator.required(),
      },
    }),
    async ({
      locals: {
        body: { email, password },
      },
      res,
    }) => {
      const query = UserModel.query()
        .findOne({ email })
        .where({ isDelete: false })
      const user = await query

      if (!user || !(await user.checkPassword(password))) {
        res.status(401).send({ error: "Invalid credentials" })

        return
      }

      const userValidate = await query.where({ validate: true })

      if (!userValidate) {
        res
          .status(401)
          .send({ error: "Validate your account, check your email ! " })

        return
      }

      const jwt = jsonwebtoken.sign(
        {
          payload: {
            user: {
              id: user.id,
              isAdmin: user.isAdmin,
            },
          },
        },
        config.security.jwt.secret,
        { expiresIn: config.security.jwt.expiresIn }
      )

      res.send({ result: { jwt, user } })
    },
  ],
})

export default handler
