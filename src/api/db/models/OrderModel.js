import BaseModel from "./BaseModel.js"
import UserModel from "./UserModel.js"
import AddressModel from "./AddressModel.js"
import RelOrderProductModel from "./RelOrderProduct.js"

class OrderModel extends BaseModel {
  static tableName = "orders"

  static relationMappings() {
    return {
      user: {
        relation: BaseModel.HasManyRelation,
        modelClass: UserModel,
        join: {
          from: "orders.userId",
          to: "users.id",
        },
      },
      address: {
        relation: BaseModel.HasManyRelation,
        modelClass: AddressModel,
        join: {
          from: "orders.addressId",
          to: "address.id",
        },
      },
      relation: {
        relation: BaseModel.HasManyRelation,
        modelClass: RelOrderProductModel,
        join: {
          from: "orders.id",
          to: "rel_order_product.orderId",
        },
      },
    }
  }
}

export default OrderModel
