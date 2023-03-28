import hashPassword from "@/api/db/hashPassword.js"
import UserModel from "@/api/db/models/UserModel.js"
import validate from "@/api/middlewares/validate.js"
import mw from "@/api/mw.js"
import sgMail from "@sendgrid/mail"
import {
  stringValidator,
  emailValidator,
  passwordValidator,
} from "@/validators.js"

const handler = mw({
  POST: [
    validate({
      body: {
        userName: stringValidator.required(),
        firstName: stringValidator.required(),
        lastName: stringValidator.required(),
        email: emailValidator.required(),
        password: passwordValidator.required(),
      },
    }),
    async ({
      locals: {
        body: { userName, firstName, lastName, email, password },
      },
      res,
    }) => {
      const user = await UserModel.query().findOne({ email })

      if (user) {
        res.send({ result: true })

        return
      }

      const [passwordHash, passwordSalt] = await hashPassword(password)

      const newUser = await UserModel.query()
        .insert({
          userName,
          firstName,
          lastName,
          email,
          passwordHash,
          passwordSalt,
        })
        .returning("users.firstName", "users.lastName", "users.email")

      sgMail.setApiKey(process.env.KEY_SEND_GRID)

      const sendGridMail = {
        to: newUser.email,
        from: "airnesMATD@gmail.com",
        templateId: "d-1f800864e3ef4697812547f4734628ab",
        dynamic_template_data: {
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
        },
      }

      try {
        await sgMail.send(sendGridMail)
        res.send({ result: true })
      } catch {
        res.send("OK..")
      }
    },
  ],
})

export default handler
