import BaseModel from "./BaseModel.js"
import ProductModel from "./ProductModel.js"

class MaterialModel extends BaseModel {
  static tableName = "materials"

  static relationMappings() {
    return {
      product: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: ProductModel,
        join: {
          from: "materials.id",
          through: {
            from: "rel_material_product.materialId",
            to: "rel_material_product.productId",
          },
          to: "products.id",
        },
      },
    }
  }
}

export default MaterialModel
