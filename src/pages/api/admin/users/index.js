import hashPassword from "@/api/db/hashPassword"
import UserModel from "@/api/db/models/UserModel"
import validate from "@/api/middlewares/validate.js"
import mw from "@/api/mw.js"
import {
  boolValidator,
  emailValidator,
  passwordValidator,
  stringValidator,
} from "@/validators"

const handler = mw({
  POST: [
    validate({
      body: {
        firstName: stringValidator.required(),
        lastName: stringValidator.required(),
        userName: stringValidator.required(),
        email: emailValidator.required(),
        password: passwordValidator.required(),
        isAdmin: boolValidator.default(false),
      },
    }),
    async ({
      locals: {
        body: { userName, firstName, lastName, email, password, isAdmin },
      },
      res,
    }) => {
      const user = await UserModel.query().findOne({ email })

      if (user) {
        res.send({ result: "User already exists" })

        return
      }

      const [passwordHash, passwordSalt] = await hashPassword(password)

      await UserModel.query().insertAndFetch({
        userName,
        firstName,
        lastName,
        email,
        passwordHash,
        passwordSalt,
        isAdmin,
      })

      res.send({ result: true })
    },
  ],
})

export default handler
