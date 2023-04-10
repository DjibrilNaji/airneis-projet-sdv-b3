import BaseModel from "./BaseModel.js"
import ProductModel from "./ProductModel.js"

class CategoryModel extends BaseModel {
  static tableName = "categories"

  static modifiers = {
    paginate: (query, limit, page) => {
      return query.limit(limit).offset((page - 1) * limit)
    },
  }

  static relationMappings() {
    return {
      product: {
        relation: BaseModel.HasManyRelation,
        modelClass: ProductModel,
        join: {
          from: "categories.id",
          to: "products.categoryId",
        },
      },
    }
  }
}

export default CategoryModel
