module.exports.up = async (knex) => {
  await knex.schema.alterTable("materials", (table) => {
    table.string("nameMaterial").unique().alter()
  })
}

module.exports.down = async (knex) => {
  await knex.schema.alterTable("materials", (table) => {
    table.dropUnique("nameMaterial")
  })
}
