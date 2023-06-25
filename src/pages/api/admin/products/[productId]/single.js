import ProductModel from "@/api/db/models/ProductModel"
import { InvalidAccessError, NotFoundError } from "@/api/errors"
import validate from "@/api/middlewares/validate.js"
import s3 from "@@/configAWS.js"
import mw from "@/api/mw.js"
import {
  boolValidator,
  idValidator,
  integerValidator,
  materialValidator,
  numberValidator,
  stringValidator,
  urlSlugValidator,
} from "@/validators"
import MaterialModel from "@/api/db/models/MaterialModel"
import knex from "knex"
import config from "@/api/config"

const db = knex(config.db)

const handler = mw({
  GET: [
    validate({
      query: {
        productId: idValidator.required(),
      },
    }),
    async ({
      locals: {
        query: { productId },
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

      const product = await ProductModel.query()
        .where({ id: productId })
        .withGraphFetched("image")
        .withGraphFetched("materials")
        .modifyGraph("materials", (builder) => {
          builder.select("nameMaterial")
        })

      if (!product) {
        throw new NotFoundError()
      }

      product[0].materials.map((mat, index) => {
        product[0].materials.splice(index, 1, mat.nameMaterial)
      })

      product[0].image.map((imageProduct) => {
        imageProduct.urlImage = s3.getSignedUrl("getObject", {
          Bucket: "airness-matd",
          Key: imageProduct.urlImage,
        })
      })

      res.send({ result: { product } })
    },
  ],
  PATCH: [
    validate({
      query: {
        productId: idValidator.required(),
      },
      body: {
        name: stringValidator,
        description: stringValidator,
        price: numberValidator,
        stock: integerValidator,
        highlander: boolValidator,
        slug: urlSlugValidator,
        materials: materialValidator,
      },
    }),
    async ({
      locals: {
        query: { productId },
        body: { name, description, price, stock, highlander, slug, materials },
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

      const product = await ProductModel.query().where({ id: productId })

      if (!product) {
        throw new NotFoundError()
      }

      await db("rel_material_product").where({ productId: productId }).del()

      if (materials) {
        materials.map(async (mat) => {
          const materialId = await MaterialModel.query()
            .select("materials.id")
            .findOne({ nameMaterial: mat })

          await db("rel_material_product").insert({
            productId,
            materialId: materialId.id,
          })
        })
      }

      const newProduct = await ProductModel.query()
        .updateAndFetchById(productId, {
          ...(name ? { name } : {}),
          ...(description ? { description } : {}),
          ...(price ? { price } : {}),
          ...(stock ? { stock } : {}),
          ...(highlander ? { highlander } : {}),
          ...(slug ? { slug } : {}),
        })
        .withGraphFetched("image")
        .withGraphFetched("materials")
        .modifyGraph("materials", (builder) => builder.select("nameMaterial"))

      newProduct.materials.map((mat, index) => {
        newProduct.materials.splice(index, 1, mat.nameMaterial)
      })

      newProduct.image.map((imageProduct) => {
        imageProduct.urlImage = s3.getSignedUrl("getObject", {
          Bucket: "airness-matd",
          Key: imageProduct.urlImage,
        })
      })

      res.send({ result: newProduct })
    },
  ],
})

export default handler
