import BaseModel from "./BaseModel.js"
import ProductModel from "./ProductModel.js"

class ImageProductModel extends BaseModel {
  static tableName = "imageProduct"

  static relationMappings() {
    return {
      product: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: ProductModel,
        join: {
          from: "imageProduct.productId",
          to: "products.id",
        },
      },
    }
  }
}

export default ImageProductModel
