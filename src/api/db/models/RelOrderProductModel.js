import BaseModel from "./BaseModel.js"
import ProductModel from "./ProductModel.js"
import OrderModel from "./OrderModel.js"

class RelOrderProductModel extends BaseModel {
  static tableName = "rel_order_product"

  static relationMappings() {
    return {
      product: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: ProductModel,
        join: {
          from: "rel_order_product.productId",
          to: "products.id",
        },
      },
      order: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: OrderModel,
        join: {
          from: "rel_order_product.orderId",
          to: "orders.id",
        },
      },
    }
  }
}

export default RelOrderProductModel
