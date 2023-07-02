import mw from "@/api/mw.js"
import RelOrderProductModel from "@/api/db/models/RelOrderProductModel"
import { raw } from "objection"

const handler = mw({
  GET: [
    async ({ req, res }) => {
      const { startDate, endDate } = req.query

      if (!startDate || !endDate) {
        res.status(400).send("Start and end dates are required.")

        return
      }

      const rawData = await RelOrderProductModel.query()
        .joinRelated("product.category")
        .joinRelated("order")
        .select(
          raw(
            'DATE("order"."createdAt") as date, "product:category"."name" as category'
          )
        )
        .select(
          RelOrderProductModel.raw(
            'AVG("order"."total_price") as averageOrderAmount'
          )
        )
        .whereBetween("order.createdAt", [startDate, endDate])
        .groupBy("date", "category")

      let data = {}

      rawData.forEach((item) => {
        const date = item.date

        if (!data[date]) {
          data[date] = []
        }

        data[date].push({
          category: item.category,
          averageOrderAmount: item.averageorderamount,
        })
      })

      res.send({
        result: data,
      })
    },
  ],
})

export default handler
