import BaseModel from "./BaseModel.js"
import CategoryModel from "./CategoryModel.js"
import RelMaterialProductModel from "./RelMaterialProductModel.js"
import RelOrderProductModel from "./RelOrderProduct.js"
import ImageProductModel from "./ImageProductModel.js"

class ProductModel extends BaseModel {
  static tableName = "products"

  static relationMappings() {
    return {
      category: {
        relation: BaseModel.HasManyRelation,
        modelClass: CategoryModel,
        join: {
          from: "products.categoryId",
          to: "category.id",
        },
      },
      relationToMaterial: {
        relation: BaseModel.HasManyRelation,
        modelClass: RelMaterialProductModel,
        join: {
          from: "products.id",
          to: "rel_material_product.productId",
        },
      },
      relationToOrder: {
        relation: BaseModel.HasManyRelation,
        modelClass: RelOrderProductModel,
        join: {
          from: "products.id",
          to: "rel_order_product.productId",
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
