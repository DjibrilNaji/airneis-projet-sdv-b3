import OrderModel from "@/api/db/models/OrderModel"
import validate from "@/api/middlewares/validate.js"
import mw from "@/api/mw.js"
import { stringValidator } from "@/validators"

const handler = mw({
  PATCH: [
    validate({
      query: {
        numberOrder: stringValidator.required(),
      },
    }),
    async ({
      locals: {
        query: { numberOrder },
      },
      res,
    }) => {
      const order = await OrderModel.query()
        .findOne({ numberOrder: numberOrder })
        
      if (!order) {
        res.status(401).send({ error: "No orders found" })

        return
      }

      const newStatus = await order.$query()
        .patchAndFetch({status: "Cancelled"})
        

      res.send({
        result: {
            newStatus,
        },
      })
    },
  ],
})

export default handler
