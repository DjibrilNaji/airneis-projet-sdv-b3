import BaseModel from "./BaseModel.js"
import ProductModel from "./ProductModel.js"
import OrderModel from "./OrderModel.js"

class RelProductMaterialModel extends BaseModel {
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
      order: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: OrderModel,
        join: {
          from: "rel_material_product.materialId",
          to: "materials.id",
        },
      },
    }
  }
}

export default RelProductMaterialModel
