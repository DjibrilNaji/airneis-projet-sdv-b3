import validate from "@/api/middlewares/validate.js"
import mw from "@/api/mw.js"
import { idValidator, stringValidator } from "@/validators"
import { InvalidAccessError, InvalidSessionError } from "@/api/errors"
import config from "@/api/config"
import jsonwebtoken from "jsonwebtoken"
import AddressModel from "@/api/db/models/AddressModel"

const handler = mw({
  GET: [
    validate({
      query: {
        userId: idValidator.required(),
        add: stringValidator.required(),
      },
    }),
    async ({
      locals: {
        query: { userId, add },
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

      const address = await AddressModel.query()
        .where({ userId: userId })
        .where({ addressFull: add })

      if (!address) {
        res.status(401).send({ error: "No user found" })

        return
      }

      res.send({ result: address })
    },
  ],
})

export default handler
