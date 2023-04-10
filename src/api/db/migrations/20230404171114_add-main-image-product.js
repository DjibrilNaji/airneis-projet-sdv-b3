module.exports.up = async (knex) => {
  await knex.schema.alterTable("image_product", (table) => {
    table.boolean("isMain").default(false)
  })
}

module.exports.down = async (knex) => {
  await knex.schema.alterTable("image_product", (table) => {
    table.dropColumns("isMain")
  })
}
