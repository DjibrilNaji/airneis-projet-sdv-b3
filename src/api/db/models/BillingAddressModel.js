import BaseModel from "./BaseModel.js"
import UserModel from "./UserModel.js"

class BillingAddressModel extends BaseModel {
  static tableName = "billing_address"

  static relationMappings() {
    return {
      user: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: "billing_address.userId",
          to: "users.id",
        },
      },
    }
  }
}

export default BillingAddressModel
