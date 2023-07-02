import validate from "@/api/middlewares/validate.js"
import mw from "@/api/mw.js"
import { idValidator } from "@/validators"
import { InvalidAccessError, NotFoundError } from "@/api/errors"
import UserModel from "@/api/db/models/UserModel"

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

      if (sessionUser.isAdmin !== true) {
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
