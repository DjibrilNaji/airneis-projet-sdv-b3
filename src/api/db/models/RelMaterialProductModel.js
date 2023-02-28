import BaseModel from "./BaseModel.js"
import ProductModel from "./ProductModel.js"
import MeterialModel from "./MaterialModel.js"

class RelMaterialProductModel extends BaseModel {
  static tableName = "rel_material_product"

  static relationMappings() {
    return {
      product: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: ProductModel,
        join: {
          from: "rel_material_product.productId",
          to: "products.id",
        },
      },
      material: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: MeterialModel,
        join: {
          from: "rel_material_product.materialId",
          to: "materials.id",
        },
      },
    }
  }
}

export default RelMaterialProductModel
