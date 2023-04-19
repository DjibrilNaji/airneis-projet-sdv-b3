import mw from "@/api/mw.js"
import validate from "@/api/middlewares/validate.js"
import {
  boolValidator,
  integerValidator,
  limitValidator,
  numberValidator,
  orderValidator,
  pageValidator,
  stringValidator,
  urlSlugValidator,
} from "@/validators.js"
import ProductModel from "@/api/db/models/ProductModel"
import ImageProductModel from "@/api/db/models/ImageProductModel"

const handler = mw({
  GET: [
    validate({
      query: {
        limit: limitValidator,
        page: pageValidator,
        order: orderValidator.default("asc"),
      },
    }),
    async ({
      locals: {
        query: { limit, page, order, sortColumn, searchTerm },
      },
      res,
    }) => {
      const searchTermModified = `%${searchTerm}%`

      const query = ProductModel.query()

      if (searchTerm) {
        query
          .whereRaw("UPPER(name) LIKE ?", [searchTermModified.toUpperCase()])
          .modify("paginate", limit, page)
      } else {
        query.modify("paginate", limit, page)
      }

      if (!query) {
        res.send({ result: "An error occurred while retrieving users" })
      }

      const [countResult] = await query
        .clone()
        .clearSelect()
        .limit(1)
        .offset(0)
        .count()

      const count = Number.parseInt(countResult.count, 10)

      const products = await query.orderBy(sortColumn, order)

      res.send({
        result: {
          products,
          meta: {
            count,
          },
        },
      })
    },
  ],
  POST: [
    validate({
      body: {
        name: stringValidator.required(),
        description: stringValidator.required(),
        price: numberValidator.required(),
        quantity: integerValidator.required(),
        highlander: boolValidator.required(),
        slug: urlSlugValidator.required(),
        urlImages: stringValidator.nullable(),
        categorieId: stringValidator.required().default("1"),
      },
    }),
    async ({
      locals: {
        body: {
          name,
          description,
          price,
          quantity,
          highlander,
          slug,
          categorieId,
          urlImage,
        },
      },
      res,
    }) => {
      const product = await ProductModel.query().findOne({ slug })

      if (product) {
        res.send({ result: "An error occurred while retrieving product" })
      }

      const categoryId = parseInt(categorieId)
      const price_formatted = price.toFixed(2).toString() + " €"
      const isDelete = false

      const newProduct = await ProductModel.query().insertAndFetch({
        name,
        description,
        price,
        quantity,
        highlander,
        categoryId,
        slug,
        price_formatted,
        isDelete,
      })

      if (urlImage && urlImage !== null) {
        const productId = newProduct.id
        const isMain = true
        await ImageProductModel.query().insert({
          urlImage,
          productId,
          isMain,
        })
      }

      res.send({ result: newProduct })
    },
  ],
})

export default handler
