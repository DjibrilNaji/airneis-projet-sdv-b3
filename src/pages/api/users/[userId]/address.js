import validate from "@/api/middlewares/validate.js"
import mw from "@/api/mw.js"
import {
  boolValidator,
  idValidator,
  integerValidator,
  stringValidator,
} from "@/validators"
import {
  InvalidAccessError,
  InvalidSessionError,
  NotFoundError,
} from "@/api/errors"
import config from "@/api/config"
import jsonwebtoken from "jsonwebtoken"
import AddressModel from "@/api/db/models/AddressModel"

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
      req,
      res,
    }) => {
      const {
        session: { user: sessionUser },
      } = req

      if (sessionUser.id !== userId) {
        throw new InvalidAccessError()
      }

      const address = await AddressModel.query()
        .where({ userId: userId })
        .where({ isDelete: false })
        .orderBy("address.id")

      if (!address) {
        throw new NotFoundError()
      }

      res.send({ result: address })
    },
  ],
  POST: [
    validate({
      query: {
        userId: idValidator.required(),
      },
      body: {
        firstName: stringValidator.required(),
        lastName: stringValidator.required(),
        addressFull: stringValidator.required(),
        addressOptional: stringValidator.nullable(),
        country: stringValidator.required(),
        cp: integerValidator.required(),
        city: stringValidator.required(),
        phoneNumber: stringValidator.required(),
        address_default: boolValidator.required(),
      },
    }),
    async ({
      locals: {
        query: { userId },
        body: {
          firstName,
          lastName,
          addressFull,
          addressOptional,
          city,
          country,
          cp,
          phoneNumber,
          address_default,
        },
      },
      req,
      res,
    }) => {
      const { authorization } = req.headers

      if (!authorization) {
        throw new InvalidSessionError()
      } else {
        const { payload } = jsonwebtoken.verify(
          authorization.slice(7),
          config.security.jwt.secret
        )

        req.session = payload
      }

      const {
        session: { user: sessionUser },
      } = req

      if (sessionUser.id !== userId) {
        throw new InvalidAccessError()
      }

      const addressDefault = await AddressModel.query()
        .where({ userId: userId })
        .where({ address_default: true })
        .where({ isDelete: false })

      if (addressDefault.length !== 0 && address_default === true) {
        await AddressModel.query()
          .patch({ address_default: false })
          .where({ id: addressDefault[0].id })
      } else if (addressDefault.length === 0) {
        address_default = true
      }

      await AddressModel.query().insert({
        firstName,
        lastName,
        addressFull,
        addressOptional,
        city,
        cp,
        country,
        phoneNumber,
        address_default,
        userId,
      })

      res.send({ result: "OK" })
    },
  ],
})

export default handler
