module.exports.up = async (knex) => {
  await knex.schema.renameTable("billingAddress", "billing_address")
  await knex.schema.renameTable("imageProduct", "image_product")
}

module.exports.down = async (knex) => {
  await knex.schema.renameTable("billing_address", "billingAddress")
  await knex.schema.renameTable("image_product", "imageProduct")
}
