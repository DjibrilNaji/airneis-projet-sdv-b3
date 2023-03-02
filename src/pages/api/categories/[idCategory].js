import CategoryModel from "@/api/db/models/CategoryModel.js"
import validate from "@/api/middlewares/validate.js"
import mw from "@/api/mw.js"
import { idValidator } from "@/validators"
import s3 from "@@/configAWS.js"

const handler = mw({
  GET: [
    validate({
      query: {
        idCategory: idValidator.required(),
      },
    }),
    async ({
      locals: {
        query: { idCategory },
      },
      res,
    }) => {
      const category = await CategoryModel.query().where({ id: idCategory })

      const imageUrl = category.map((cat) => cat.urlImage)
      const params = {
        Bucket: "airness-matd",
        Key: imageUrl.toString(),
      }
      const data = s3.getSignedUrl("getObject", params)

      if (!category) {
        res.status(401).send({ error: "No category found" })

        return
      }

      res.send({ result: { category, data } })
    },
  ],
})

export default handler
