import { InvalidSessionError } from "@/api/errors.js"
import config from "./config"
import jsonwebtoken from "jsonwebtoken"

const auth = async (req, res, next) => {
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

  next()
}

export default auth
