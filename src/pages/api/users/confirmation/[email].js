import UserModel from "@/api/db/models/UserModel"
import validate from "@/api/middlewares/validate.js"
import mw from "@/api/mw.js"
import { emailValidator } from "@/validators"

const handler = mw({
  PATCH: [
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
      const user = await UserModel.query().findOne({ email: email })

      if (!user) {
        res.status(401).send({ error: "No user found" })

        return
      }

      await UserModel.query().patch({ validate: true }).where({ email: email })

      res.send({ result: true, msg: "user validate" })
    },
  ],
})

export default handler
