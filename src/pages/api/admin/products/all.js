import mw from "@/api/mw.js"
import validate from "@/api/middlewares/validate.js"
import {
  boolValidator,
  integerValidator,
  limitValidator,
  materialValidator,
  numberValidator,
  orderValidator,
  pageValidator,
  stringValidator,
  urlSlugValidator,
} from "@/validators.js"
import ProductModel from "@/api/db/models/ProductModel"
import ImageProductModel from "@/api/db/models/ImageProductModel"
import MaterialModel from "@/api/db/models/MaterialModel"
import knex from "knex"
import config from "@/api/config"

const db = knex(config.db)

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
        .withGraphFetched("category")
        .withGraphFetched("materials")

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
        .clearWithGraph()
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
        stock: integerValidator.required(),
        highlander: boolValidator.required(),
        slug: urlSlugValidator.required(),
        urlImages: stringValidator.nullable(),
        categorieId: stringValidator.required().default("1"),
        materials: materialValidator.required(),
      },
    }),
    async ({
      locals: {
        body: {
          name,
          description,
          price,
          stock,
          highlander,
          slug,
          categorieId,
          urlImage,
          materials,
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
        stock,
        highlander,
        categoryId,
        slug,
        price_formatted,
        isDelete,
      })

      const productId = newProduct.id

      if (urlImage && urlImage !== null) {
        const isMain = true
        await ImageProductModel.query().insert({
          urlImage,
          productId,
          isMain,
        })
      }

      materials.map(async (mat) => {
        const materialId = await MaterialModel.query()
          .select("materials.id")
          .findOne({ nameMaterial: mat })
        await db("rel_material_product").insert({
          productId,
          materialId: materialId.id,
        })
      })

      res.send({ result: newProduct })
    },
  ],
})

export default handler
