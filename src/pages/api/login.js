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
      const user = await UserModel.query().findOne({ email })

      if (!user || !(await user.checkPassword(password))) {
        res.status(401).send({ error: "Invalid credentials" })

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

      res.send({ result: jwt })
    },
  ],
})

export default handler
