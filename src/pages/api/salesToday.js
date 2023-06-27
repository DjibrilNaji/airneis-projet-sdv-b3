import OrderModel from "@/api/db/models/OrderModel"
import mw from "@/api/mw"

const handler = mw({
  GET: [
    async ({ res }) => {
      const today = new Date()
      const data = await OrderModel.query()
        .whereRaw('DATE("createdAt") = ?', [today])
        .select(OrderModel.raw('DATE("createdAt") as date'))
        .count("id as orderCount")
        .sum("total_price as totalRevenue")
        .groupByRaw('DATE("createdAt")')
        .orderBy("date", "ASC")

      res.send({
        result: data,
      })
    },
  ],
})

export default handler
