import validate from "@/api/middlewares/validate.js"
import mw from "@/api/mw.js"
import { idValidator } from "@/validators"
import UserModel from "@/api/db/models/UserModel"
import { InvalidAccessError, NotFoundError } from "@/api/errors"

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
      req,
    }) => {
      const {
        session: { user: sessionUser },
      } = req

      if (sessionUser.id !== userId) {
        throw new InvalidAccessError()
      }

      const user = await UserModel.query().findById(userId)

      if (!user) {
        throw new NotFoundError()
      }

      const userDeleted = await UserModel.query()
        .patch({ isDelete: true })
        .where({ id: userId })
        .returning("*")

      res.send({
        result: userDeleted,
      })
    },
  ],
})

export default handler
