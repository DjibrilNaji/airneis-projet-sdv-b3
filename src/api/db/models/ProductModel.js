import BaseModel from "./BaseModel.js"
import CategoryModel from "./CategoryModel.js"
import ImageProductModel from "./ImageProductModel.js"
import MaterialModel from "./MaterialModel.js"
import OrderModel from "./OrderModel.js"

class ProductModel extends BaseModel {
  static tableName = "products"

  static modifiers = {
    paginate: (query, limit, page) => {
      return query.limit(limit).offset((page - 1) * limit)
    },
  }

  static relationMappings() {
    return {
      category: {
        relation: BaseModel.HasManyRelation,
        modelClass: CategoryModel,
        join: {
          from: "products.categoryId",
          to: "categories.id",
        },
      },
      materials: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: MaterialModel,
        join: {
          from: "products.id",
          through: {
            from: "rel_material_product.productId",
            to: "rel_material_product.materialId",
          },
          to: "materials.id",
        },
      },
      order: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: OrderModel,
        join: {
          from: "products.id",
          through: {
            from: "rel_order_product.productId",
            to: "rel_order_product.orderId",
          },
          to: "orders.id",
        },
      },
      image: {
        relation: BaseModel.HasManyRelation,
        modelClass: ImageProductModel,
        join: {
          from: "products.id",
          to: "image_product.productId",
        },
      },
    }
  }
}

export default ProductModel
