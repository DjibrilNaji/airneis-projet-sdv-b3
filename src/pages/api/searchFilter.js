import ProductModel from "@/api/db/models/ProductModel"
import validate from "@/api/middlewares/validate"
import {
  limitValidator,
  numberValidator,
  orderValidator,
  pageValidator,
  stringValidator,
} from "@/validators.js"
import mw from "@/api/mw"
import MaterialModel from "@/api/db/models/MaterialModel"
import CategoryModel from "@/api/db/models/CategoryModel"
import s3 from "@@/configAWS.js"

const handler = mw({
  GET: [
    validate({
      query: {
        limit: limitValidator.nullable(),
        page: pageValidator.nullable(),
        order: orderValidator.default("asc").nullable(),
        material: stringValidator.nullable(),
        minPrice: numberValidator.nullable(),
        maxPrice: numberValidator.nullable(),
        category: stringValidator.nullable(),
      },
    }),
    async ({
      locals: {
        query: {
          limit,
          page,
          order,
          sortColumn,
          searchTerm,
          material,
          minPrice,
          maxPrice,
          category,
        },
      },
      res,
    }) => {
      const query = ProductModel.query()
        .withGraphFetched("materials")
        .withGraphFetched("image")

      if (searchTerm) {
        const searchTermModified = `%${searchTerm}%`
        query.whereRaw("UPPER(name) LIKE ?", [searchTermModified.toUpperCase()])
      }

      if (minPrice) {
        query.where("price", ">=", minPrice)
      }

      if (maxPrice) {
        query.where("price", "<=", maxPrice)
      }

      if (material) {
        query.joinRelated("materials").where("materials.nameMaterial", material)
      }

      if (category) {
        query.where("categoryId", category)
      }

      query.modify("paginate", limit, page)

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

      if (!products) {
        res.send({ result: "An error occurred while retrieving users" })
      }

      products.map((product) =>
        product.image.map(
          (image) =>
            (image.urlImage = s3.getSignedUrl("getObject", {
              Bucket: "airness-matd",
              Key: image.urlImage,
            }))
        )
      )

      const materials = await MaterialModel.query().select("id", "nameMaterial")

      const categories = await CategoryModel.query()

      res.send({
        result: {
          products,
          materials,
          categories,
          meta: {
            count,
          },
        },
      })
    },
  ],
})

export default handler
