module.exports.up = async (knex) => {
  await knex.schema.alterTable("address", (table) => {
    table.boolean("isDelete").default(false)
    table.boolean("address_default").default(false)
  })
}

module.exports.down = async (knex) => {
  await knex.schema.alterTable("address", (table) => {
    table.dropColumns("address_default")
    table.dropColumns("isDelete")
  })
}
