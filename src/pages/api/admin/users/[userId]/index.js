import AddressModel from "@/api/db/models/AddressModel"
import BillingAddressModel from "@/api/db/models/BillingAddressModel"
import OrderModel from "@/api/db/models/OrderModel"
import UserModel from "@/api/db/models/UserModel"
import { NotFoundError } from "@/api/errors"
import validate from "@/api/middlewares/validate.js"
import mw from "@/api/mw.js"
import { emailValidator, idValidator, stringValidator } from "@/validators"

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
      },
    }),
    async ({
      locals: {
        query: { userId },
        body: { firstName, lastName, userName, email },
      },
      res,
    }) => {
      const user = await UserModel.query().findById(userId)

      if (!user) {
        res.status(401).send({ error: "No user found" })

        return
      }

      const updateUser = await UserModel.query().updateAndFetchById(userId, {
        ...(firstName ? { firstName } : {}),
        ...(lastName ? { lastName } : {}),
        ...(email ? { email } : {}),
        ...(userName ? { userName } : {}),
      })

      res.send({ result: updateUser })
    },
  ],
})

export default handler
