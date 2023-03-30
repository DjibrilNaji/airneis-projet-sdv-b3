import BaseModel from "./BaseModel.js"
import ProductModel from "./ProductModel.js"

class ImageProductModel extends BaseModel {
  static tableName = "image_product"

  static relationMappings() {
    return {
      product: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: ProductModel,
        join: {
          from: "image_product.productId",
          to: "products.id",
        },
      },
    }
  }
}

export default ImageProductModel
