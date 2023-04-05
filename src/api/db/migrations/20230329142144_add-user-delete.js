module.exports.up = async (knex) => {
  await knex.schema.alterTable("users", (table) => {
    table.boolean("isDelete").default(false)
    table.boolean("isAdmin").default(false)
  })
}

module.exports.down = async (knex) => {
  await knex.schema.alterTable("users", (table) => {
    table.dropColumns("isAdmin")
    table.dropColumns("isDelete")
  })
}
