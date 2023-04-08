import BaseModel from "./BaseModel.js"

class ContactModel extends BaseModel {
  static tableName = "contact"

  static modifiers = {
    paginate: (query, limit, page) => {
      return query.limit(limit).offset((page - 1) * limit)
    },
  }
}

export default ContactModel
