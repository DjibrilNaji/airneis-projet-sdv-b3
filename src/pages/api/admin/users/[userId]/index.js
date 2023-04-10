import hashPassword from "@/api/db/hashPassword"
import AddressModel from "@/api/db/models/AddressModel"
import BillingAddressModel from "@/api/db/models/BillingAddressModel"
import OrderModel from "@/api/db/models/OrderModel"
import UserModel from "@/api/db/models/UserModel"
import { NotFoundError } from "@/api/errors"
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
    }) => {
      const user = await UserModel.query().where({ id: userId })

      if (!user) {
        throw new NotFoundError()
      }

      const billingAddress = await BillingAddressModel.query().where({
        userId: userId,
      })

      if (!billingAddress) {
        throw new NotFoundError()
      }

      const address = await AddressModel.query().where({
        userId: userId,
      })

      if (!address) {
        throw new NotFoundError()
      }

      const order = await OrderModel.query()
        .where({ "orders.userId": userId })
        .innerJoin("address", "orders.addressId", "=", "address.id")
        .select(
          "orders.numberOrder",
          "orders.status",
          "orders.price",
          "orders.price_formatted",
          "orders.amount_tva_formatted",
          "address.addressFull",
          "address.city",
          "address.cp",
          "address.country",
          "address.phoneNumber"
        )

      if (!order) {
        throw new NotFoundError()
      }

      res.send({ result: { user, billingAddress, address, order } })
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
    }) => {
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
