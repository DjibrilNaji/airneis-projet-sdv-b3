import validate from "@/api/middlewares/validate.js"
import mw from "@/api/mw.js"
import { idValidator, stringValidator, integerValidator } from "@/validators"
import {
  InvalidAccessError,
  InvalidSessionError,
  NotFoundError,
} from "@/api/errors"
import config from "@/api/config"
import jsonwebtoken from "jsonwebtoken"
import BillingAddressModel from "@/api/db/models/BillingAddressModel"

const handler = mw({
  PATCH: [
    validate({
      query: {
        billingAddressId: idValidator.required(),
      },
      body: {
        addressFull: stringValidator,
        country: stringValidator,
        cp: integerValidator,
        city: stringValidator,
        phoneNumber: stringValidator,
      },
    }),
    async ({
      locals: {
        query: { billingAddressId },
        body: { addressFull, city, country, cp, phoneNumber },
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

      const billingAddress = await BillingAddressModel.query()
        .findById(billingAddressId)
        .withGraphFetched("user")

      if (!billingAddress) {
        throw new NotFoundError()
      }

      if (sessionUser.id !== billingAddress.user.id) {
        throw new InvalidAccessError()
      }

      const updateBillingAddress =
        await BillingAddressModel.query().updateAndFetchById(billingAddressId, {
          ...(addressFull ? { addressFull } : {}),
          ...(city ? { city } : {}),
          ...(cp ? { cp } : {}),
          ...(country ? { country } : {}),
          ...(phoneNumber ? { phoneNumber } : {}),
        })

      res.send({ result: updateBillingAddress })
    },
  ],
})

export default handler
