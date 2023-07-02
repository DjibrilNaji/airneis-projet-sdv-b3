import hashPassword from "@/api/db/hashPassword"
import OrderModel from "@/api/db/models/OrderModel"
import UserModel from "@/api/db/models/UserModel"
import { InvalidAccessError, NotFoundError } from "@/api/errors"
import validate from "@/api/middlewares/validate.js"
import mw from "@/api/mw.js"
import {
  boolValidator,
  emailValidator,
  idValidator,
  passwordValidator,
  stringValidator,
} from "@/validators"

const handler = mw({
  GET: [
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

      const user = await UserModel.query()
        .where({ id: userId })
        .withGraphFetched("billingAddress")
        .withGraphFetched("address")

      if (!user) {
        throw new NotFoundError()
      }

      const order = await OrderModel.query()
        .where({ "orders.userId": userId })
        .withGraphFetched("address")

      if (!order) {
        throw new NotFoundError()
      }

      res.send({ result: { user, order } })
    },
  ],
  PATCH: [
    validate({
      query: {
        userId: idValidator.required(),
      },
      body: {
        firstName: stringValidator,
        lastName: stringValidator,
        userName: stringValidator,
        email: emailValidator,
        password: passwordValidator,
        isAdmin: boolValidator,
      },
    }),
    async ({
      locals: {
        query: { userId },
        body: { firstName, lastName, userName, email, password, isAdmin },
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

      const [passwordHash, passwordSalt] = await hashPassword(password)

      const updateUser = await UserModel.query().updateAndFetchById(userId, {
        ...(firstName ? { firstName } : {}),
        ...(lastName ? { lastName } : {}),
        ...(email ? { email } : {}),
        ...(userName ? { userName } : {}),
        ...(isAdmin ? { isAdmin } : {}),
        ...(passwordHash ? { passwordHash } : {}),
        ...(passwordSalt ? { passwordSalt } : {}),
      })

      res.send({ result: updateUser })
    },
  ],
})

export default handler
