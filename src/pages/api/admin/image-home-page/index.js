import mw from "@/api/mw.js"
import s3 from "@@/configAWS.js"
import ImageHomePageModel from "@/api/db/models/ImageHomePageModel"
import { InvalidAccessError } from "@/api/errors"
import validate from "@/api/middlewares/validate"
import { stringValidator } from "@/validators"

const handler = mw({
  GET: [
    async ({ res, req }) => {
      const {
        session: { user: sessionUser },
      } = req

      if (sessionUser.isAdmin !== true) {
        throw new InvalidAccessError()
      }

      const query = ImageHomePageModel.query()

      if (!query) {
        res.send({ result: "An error occurred while retrieving users" })
      }

      const imageHomePage = await query.orderBy("id")

      imageHomePage.map((image) => {
        image.urlImage = s3.getSignedUrl("getObject", {
          Bucket: "airness-matd",
          Key: image.urlImage,
        })
      })

      res.send({
        imageHomePage,
      })
    },
  ],
  POST: [
    validate({
      body: {
        urlImage: stringValidator.required(),
      },
    }),
    async ({
      locals: {
        body: { urlImage },
      },
      res,
      req,
    }) => {
      const {
        session: { user: sessionUser },
      } = req

      if (sessionUser.isAdmin !== true) {
        throw new InvalidAccessError()
      }

      const imageHomePage = await ImageHomePageModel.query().findOne({
        urlImage,
      })

      if (imageHomePage) {
        res.send({
          result: "Image already exists",
        })
      }

      const display = false

      const newImageHomePage = await ImageHomePageModel.query().insertAndFetch({
        urlImage,
        display,
      })

      res.send({ result: newImageHomePage })
    },
  ],
})

export default handler
