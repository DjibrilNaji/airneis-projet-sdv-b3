import validate from "@/api/middlewares/validate.js"
import mw from "@/api/mw.js"
import { idValidator } from "@/validators"
import RelOrderProductModel from "@/api/db/models/RelOrderProductModel"
import knex from "knex"
import config from "@/api/config"

const db = knex(config.db)

const handler = mw({
  POST: [
    validate({
      body: {
        orderId: idValidator.required(),
        productId: idValidator.required(),
        quantity: idValidator.required(),
      },
    }),
    async ({
      locals: {
        body: { orderId, productId, quantity },
      },
      res,
    }) => {
      const relation = await RelOrderProductModel.query()
        .where({
          orderId,
        })
        .andWhere({ productId })
        .andWhere({ quantity })
        .first()

      if (relation) {
        res.send({ result: "OK" })

        return
      }

      await db("rel_order_product").insert({
        orderId,
        productId,
        quantity,
      })

      res.send({ result: "OK" })
    },
  ],
})

export default handler
