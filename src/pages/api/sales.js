import mw from "@/api/mw.js"
import OrderModel from "@/api/db/models/OrderModel"

const handler = mw({
  GET: [
    async ({ res }) => {
      const data = await OrderModel.query()
        .select(OrderModel.raw('DATE("createdAt") as date'))
        .sum("total_price as total")
        .groupByRaw('DATE("createdAt")')
        .orderBy("date", "ASC")

      res.send({
        result: data,
      })
    },
  ],
})

export default handler
