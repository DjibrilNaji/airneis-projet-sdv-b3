import mw from "@/api/mw.js"
import CategoryModel from "@/api/db/models/CategoryModel"

const handler = mw({
  GET: [
    async ({ res }) => {
      const categories = await CategoryModel.query()

      if (!categories) {
        res.send({ result: "An error occurred while retrieving categories" })
      }

      res.send({
        result: {
          categories,
        },
      })
    },
  ],
})

export default handler
