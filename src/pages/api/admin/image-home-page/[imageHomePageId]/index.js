import validate from "@/api/middlewares/validate.js"
import mw from "@/api/mw.js"
import { idValidator } from "@/validators"
import { InvalidAccessError, NotFoundError } from "@/api/errors"
import ImageHomePageModel from "@/api/db/models/ImageHomePageModel"

const handler = mw({
  PATCH: [
    validate({
      query: {
        imageHomePageId: idValidator.required(),
      },
    }),
    async ({
      locals: {
        query: { imageHomePageId },
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

      const image = await ImageHomePageModel.query().findById(imageHomePageId)

      if (!image) {
        throw new NotFoundError()
      }

      const imageUpdated = await ImageHomePageModel.query()
        .patch({ display: !image.display })
        .where({ id: imageHomePageId })
        .returning("*")

      res.send({
        result: imageUpdated,
      })
    },
  ],
})

export default handler
