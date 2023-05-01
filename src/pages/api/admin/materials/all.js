import MaterialModel from "@/api/db/models/MaterialModel"
import mw from "@/api/mw.js"

const handler = mw({
  GET: [
    async ({ res }) => {
      const materials = await MaterialModel.query()

      if (!materials) {
        res.send({ result: "An error occurred while retrieving materials" })
      }

      res.send({
        result: materials,
      })
    },
  ],
})

export default handler
