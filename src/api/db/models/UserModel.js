import BaseModel from "./BaseModel.js"
import AddressModel from "./AddressModel.js"
import BillingAddressModel from "./BillingAddressModel.js"
import hashPassword from "../hashPassword.js"

class UserModel extends BaseModel {
  static tableName = "users"

  static modifiers = {
    paginate: (query, limit, page) => {
      return query.limit(limit).offset((page - 1) * limit)
    },
  }

  static relationMappings() {
    return {
      address: {
        relation: BaseModel.HasManyRelation,
        modelClass: AddressModel,
        join: {
          from: "users.id",
          to: "address.userId",
        },
      },
      billingAddress: {
        relation: BaseModel.HasManyRelation,
        modelClass: BillingAddressModel,
        join: {
          from: "users.id",
          to: "billing_address.userId",
        },
      },
    }
  }

  checkPassword = async (password) => {
    const [passwordHash] = await hashPassword(password, this.passwordSalt)

    return passwordHash === this.passwordHash
  }
}

export default UserModel
