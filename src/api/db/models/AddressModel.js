import BaseModel from "./BaseModel.js"
import UserModel from "./UserModel.js"

class AddressModel extends BaseModel {
  static tableName = "address"

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
    }
  }
}

export default AddressModel
