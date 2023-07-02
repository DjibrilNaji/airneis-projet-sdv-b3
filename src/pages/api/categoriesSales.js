import mw from "@/api/mw.js"
import RelOrderProductModel from "@/api/db/models/RelOrderProductModel"

const handler = mw({
  GET: [
    async ({ req, res }) => {
      const { startDate, endDate } = req.query

      if (!startDate || !endDate) {
        res.status(400).send("Start and end dates are required.")

        return
      }

      const data = await RelOrderProductModel.query()
        .joinRelated("product.category")
        .joinRelated("order")
        .select("product:category.name as category")
        .select(
          RelOrderProductModel.raw(
            'sum("order"."total_price" * "rel_order_product"."quantity") as total'
          )
        )
        .whereBetween("order.createdAt", [startDate, endDate])
        .groupBy("category")
        .orderBy("total", "DESC")

      res.send({
        result: data,
      })
    },
  ],
})

export default handler
