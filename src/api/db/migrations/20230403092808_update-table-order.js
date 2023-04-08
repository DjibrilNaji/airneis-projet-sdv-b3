module.exports.up = async (knex) => {
await knex.schema.alterTable("orders", (table) => {
    table.double("price").notNullable()
    table.string("price_formatted").notNullable()
    table.double("amount_tva").notNullable()
    table.string("amount_tva_formatted").notNullable()
  })

  await knex.schema.alterTable("products", (table) => {
    table.string("price_formatted").notNullable()
  })
}

module.exports.down = async (knex) => {
  await knex.schema.alterTable("orders", (table) => {
    table.dropColumns("price")
    table.dropColumns("price_formatted")
    table.dropColumns("amount_tva")
    table.dropColumns("amount_tva_formatted")
  })
  await knex.schema.alterTable("products", (table) => {
    table.dropColumns("price_formatted")
  })
}