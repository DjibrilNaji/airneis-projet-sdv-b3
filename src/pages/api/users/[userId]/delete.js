import validate from "@/api/middlewares/validate.js"
import mw from "@/api/mw.js"
import { idValidator } from "@/validators"
import UserModel from "@/api/db/models/UserModel"
import { NotFoundError } from "@/api/errors"

const handler = mw({
  PATCH: [
    validate({
      query: {
        userId: idValidator.required(),
      },
    }),
    async ({
      locals: {
        query: { userId },
      },
      res,
    }) => {
      const user = await UserModel.query().findById(userId)

      if (!user) {
        throw new NotFoundError()
      }

      const userUpdated = await UserModel.query()
        .patch({ isDelete: true })
        .where({ id: userId })
        .returning("*")

      res.send({
        result: userUpdated,
      })
    },
  ],
})

export default handler
