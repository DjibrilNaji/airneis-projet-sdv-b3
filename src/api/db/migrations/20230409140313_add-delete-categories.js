module.exports.up = async (knex) => {
  await knex.schema.alterTable("categories", (table) => {
    table.boolean("isDelete").default(false)
  })
}

module.exports.down = async (knex) => {
  await knex.schema.alterTable("categories", (table) => {
    table.dropColumns("isDelete")
  })
}
