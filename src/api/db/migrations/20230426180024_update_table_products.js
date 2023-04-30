module.exports.up = async (knex) => {
  await knex.schema.alterTable("products", (table) => {
    table.renameColumn("quantity", "stock")
  })
}

module.exports.down = async (knex) => {
  await knex.schema.alterTable("products", (table) => {
    table.renameColumn("stock", "quantity")
  })
}
