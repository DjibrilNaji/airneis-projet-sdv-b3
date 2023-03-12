import BaseModel from "./BaseModel.js"
import UserModel from "./UserModel.js"

class BillingAddressModel extends BaseModel {
  static tableName = "billingAddress"

  static relationMappings() {
    return {
      user: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: "billingAddress.userId",
          to: "users.id",
        },
      },
    }
  }
}

export default BillingAddressModel
