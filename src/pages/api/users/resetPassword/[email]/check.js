import validate from "@/api/middlewares/validate.js"
import mw from "@/api/mw.js"
import { emailValidator } from "@/validators"
import { NotFoundError } from "@/api/errors"
import config from "@/api/config"
import jsonwebtoken from "jsonwebtoken"
import UserModel from "@/api/db/models/UserModel"
import sgMail from "@sendgrid/mail"

const handler = mw({
  GET: [
    validate({
      query: {
        email: emailValidator.required(),
      },
    }),
    async ({
      locals: {
        query: { email },
      },
      res,
    }) => {
      const query = UserModel.query().findOne({ email })

      const user = await query

      if (!user) {
        throw new NotFoundError()
      }

      const userDelete = await query.where({ isDelete: false })

      if (!userDelete) {
        throw new NotFoundError()
      }

      const userValidate = await query.where({ validate: true })

      if (!userValidate) {
        throw new NotFoundError()
      }

      const jwt = jsonwebtoken.sign(
        {
          payload: {
            user: {
              email: email,
            },
          },
        },
        config.security.jwt.secret,
        { expiresIn: "1 day" }
      )

      sgMail.setApiKey(process.env.KEY_SEND_GRID)

      const sendGridMail = {
        to: email,
        from: "airnesMATD@gmail.com",
        templateId: "d-9048014e8fd24e9fb01463b78fc8ade7",
        dynamic_template_data: {
          token: jwt,
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
