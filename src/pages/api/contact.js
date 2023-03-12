import ContactModel from "@/api/db/models/ContactModel"
import validate from "@/api/middlewares/validate.js"
import mw from "@/api/mw.js"
import { stringValidator, emailValidator } from "@/validators.js"

const handler = mw({
  POST: [
    validate({
      body: {
        email: emailValidator.required(),
        subject: stringValidator,
        message: stringValidator.required(),
      },
    }),
    async ({
      locals: {
        body: { email, subject, message },
      },
      res,
    }) => {
      await ContactModel.query().insert({
        email,
        subject,
        message,
      })

      res.send({ result: true })
    },
  ],
})

export default handler
