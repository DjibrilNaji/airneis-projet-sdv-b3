import BaseModel from "./BaseModel.js"
import RelMaterialProductModel from "./RelMaterialProductModel.js"

class MaterialModel extends BaseModel {
  static tableName = "materials"

  static relationMappings() {
    return {
      relation: {
        relation: BaseModel.HasManyRelation,
        modelClass: RelMaterialProductModel,
        join: {
          from: "materials.id",
          to: "rel_material_product.materialId",
        },
      },
    }
  }
}

export default MaterialModel
