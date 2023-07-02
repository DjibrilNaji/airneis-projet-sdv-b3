import ProductModel from "@/api/db/models/ProductModel.js"
import BaseModel from "./BaseModel.js"
import UserModel from "./UserModel.js"

class FavoriteModel extends BaseModel {
  static tableName = "favorites"

  static relationMappings() {
    return {
      user: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: "address.userId",
          to: "users.id",
        },
      },
      product: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: ProductModel,
        join: {
          from: "favorites.productId",
          to: "products.id",
        },
      },
    }
  }
}

export default FavoriteModel
