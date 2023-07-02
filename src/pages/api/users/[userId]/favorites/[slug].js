import validate from "@/api/middlewares/validate.js"
import mw from "@/api/mw.js"
import { idValidator, urlSlugValidator } from "@/validators"
import { InvalidAccessError } from "@/api/errors"
import FavoriteModel from "@/api/db/models/FavoriteModel"

const handler = mw({
  GET: [
    validate({
      query: {
        userId: idValidator.required(),
        slug: urlSlugValidator.required(),
      },
    }),
    async ({
      locals: {
        query: { userId, slug },
      },
      req,
      res,
    }) => {
      const {
        session: { user: sessionUser },
      } = req

      if (sessionUser.id !== userId) {
        throw new InvalidAccessError()
      }

      const favorites = await FavoriteModel.query()
        .where({ userId: userId })
        .withGraphJoined("product")
        .where("product.slug", slug)

      res.send({ result: favorites })
    },
  ],
})

export default handler
