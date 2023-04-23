import validate from "@/api/middlewares/validate.js"
import mw from "@/api/mw.js"
import {
  idValidator,
  integerValidator,
  stringValidator,
} from "@/validators"
import {
  InvalidAccessError,
  InvalidSessionError,
} from "@/api/errors"
import config from "@/api/config"
import jsonwebtoken from "jsonwebtoken"
import BillingAddressModel from "@/api/db/models/BillingAddressModel"

const handler = mw({
  POST: [
    validate({
      query: {
        userId: idValidator.required(),
      },
      body: {
        addressFull: stringValidator.required(),
        country: stringValidator.required(),
        cp: integerValidator.required(),
        city: stringValidator.required(),
        phoneNumber: stringValidator.required(),
      },
    }),
    async ({
      locals: {
        query: { userId },
        body: {
          addressFull,
          city,
          country,
          cp,
          phoneNumber,
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
      
      await BillingAddressModel.query().insert({
        addressFull,
        city,
        cp,
        country,
        phoneNumber,
        userId
      })

      res.send({ result: "OK" })
    },
  ],
})

export default handler
