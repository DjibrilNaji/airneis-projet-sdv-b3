import { NotFoundError } from "@/api/errors"
import * as yup from "yup"

const validate = ({ body, params, query }) => {
  const validator = yup.object().shape({
    ...(body ? { body: yup.object(body).shape() } : {}),
    ...(params ? { params: yup.object(params).shape() } : {}),
    ...(query ? { query: yup.object(query).shape() } : {}),
  })

  return async (ctx) => {
    const { req, res, next, logger } = ctx

    try {
      const { body, params, query } = await validator.validate(
        {
          body: req.body,
          params: req.params,
          query: req.query,
        },
        { abortEarly: false }
      )

      ctx.locals = {
        body,
        params,
        query,
      }

      await next()
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        res.status(422).send({ error: err.errors })

        return
      }

      if (err instanceof NotFoundError) {
        res.status(404).send({ error: err.errors[0] })

        return
      }

      logger.error(err)

      res.status(500).send({ error: err })
    }
  }
}

export default validate
