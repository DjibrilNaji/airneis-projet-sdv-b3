import validate from "@/api/middlewares/validate.js"
import mw from "@/api/mw.js"
import { idValidator } from "@/validators"
import { InvalidAccessError, InvalidSessionError } from "@/api/errors"
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
        res.status(401).send({ error: "No user found" })

        return
      }

      if (sessionUser.id !== address.userId) {
        throw new InvalidAccessError()
      }

      res.send({ result: address })
    },
  ],
})

export default handler
