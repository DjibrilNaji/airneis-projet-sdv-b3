import validate from "@/api/middlewares/validate.js"
import mw from "@/api/mw.js"
import {
  idValidator,
  stringValidator,
  integerValidator,
  boolValidator,
} from "@/validators"
import {
  InvalidAccessError,
  InvalidCredentialsError,
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
        addressId: idValidator.required(),
      },
    }),
    async ({
      locals: {
        query: { addressId },
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

      const address = await AddressModel.query().findById(addressId)

      if (!address) {
        throw new NotFoundError()
      }

      if (sessionUser.id !== address.userId) {
        throw new InvalidAccessError()
      }

      res.send({ result: address })
    },
  ],
  PATCH: [
    validate({
      query: {
        addressId: idValidator.required(),
      },
      body: {
        firstName: stringValidator,
        lastName: stringValidator,
        addressFull: stringValidator,
        addressOptional: stringValidator.nullable(),
        country: stringValidator,
        cp: integerValidator,
        city: stringValidator,
        phoneNumber: stringValidator,
        address_default: boolValidator,
      },
    }),
    async ({
      locals: {
        query: { addressId },
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

      const address = await AddressModel.query().findById(addressId)

      if (!address) {
        throw new NotFoundError()
      }

      if (sessionUser.id !== address.userId) {
        throw new InvalidAccessError()
      }

      const addressDefault = await AddressModel.query()
        .where({ userId: address.userId })
        .where("id", "!=", addressId)
        .where({ address_default: true })
        .where({ isDelete: false })

      if (addressDefault.length !== 0 && address_default === true) {
        await AddressModel.query()
          .patch({ address_default: false })
          .where({ id: addressDefault[0].id })
      } else if (addressDefault.length === 0) {
        address_default = true
      }

      const updateAddress = await AddressModel.query().updateAndFetchById(
        addressId,
        {
          ...(firstName ? { firstName } : {}),
          ...(lastName ? { lastName } : {}),
          ...(addressFull ? { addressFull } : {}),
          ...(addressOptional ? { addressOptional } : {}),
          ...(city ? { city } : {}),
          ...(cp ? { cp } : {}),
          ...(country ? { country } : {}),
          ...(phoneNumber ? { phoneNumber } : {}),
          ...(address_default
            ? { address_default }
            : { address_default: false }),
        }
      )

      res.send({ result: updateAddress })
    },
  ],
  DELETE: [
    validate({
      query: {
        addressId: idValidator.required(),
      },
    }),
    async ({
      locals: {
        query: { addressId },
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

      const address = await AddressModel.query().findById(addressId)

      if (!address) {
        throw new NotFoundError()
      }

      if (address.address_default === true) {
        throw new InvalidCredentialsError()
      }

      const userId = address.userId

      if (sessionUser.id !== userId) {
        throw new InvalidAccessError()
      }

      await AddressModel.query()
        .where({ id: addressId })
        .patch({ isDelete: true })

      const userAddress = await AddressModel.query()
        .where({ userId: userId })
        .where({ isDelete: false })

      res.send({ result: userAddress })
    },
  ],
})

export default handler
