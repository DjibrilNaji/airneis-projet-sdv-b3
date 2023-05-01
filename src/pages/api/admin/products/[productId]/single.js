import ProductModel from "@/api/db/models/ProductModel"
import { NotFoundError } from "@/api/errors"
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
    }) => {
      const product = await ProductModel.query()
        .where({ id: productId })
        .withGraphFetched("image")
        .withGraphFetched("material")
        .modifyGraph("material", (builder) => {
          builder.select("nameMaterial")
        })

      if (!product) {
        throw new NotFoundError()
      }

      product[0].material.map((mat, index) => {
        product[0].material.splice(index, 1, mat.nameMaterial)
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
        quantity: integerValidator,
        highlander: boolValidator,
        slug: urlSlugValidator,
        material: materialValidator,
      },
    }),
    async ({
      locals: {
        query: { productId },
        body: {
          name,
          description,
          price,
          quantity,
          highlander,
          slug,
          material,
        },
      },
      res,
    }) => {
      const product = await ProductModel.query().where({ id: productId })

      if (!product) {
        throw new NotFoundError()
      }

      const newProduct = await ProductModel.query()
        .updateAndFetchById(productId, {
          ...(name ? { name } : {}),
          ...(description ? { description } : {}),
          ...(price ? { price } : {}),
          ...(quantity ? { quantity } : {}),
          ...(highlander ? { highlander } : {}),
          ...(slug ? { slug } : {}),
        })
        .withGraphFetched("image")
        .withGraphFetched("material")

      await db("rel_material_product").where({ productId: productId }).del()

      material.map(async (mat) => {
        const materialId = await MaterialModel.query()
          .select("materials.id")
          .findOne({ nameMaterial: mat })

        await db("rel_material_product").insert({
          productId,
          materialId: materialId.id,
        })
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
