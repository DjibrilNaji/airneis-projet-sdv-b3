module.exports.up = async (knex) => {
  await knex.schema.alterTable("products", (table) => {
    table.dropColumns("price_formatted")
  })

  await knex.schema.alterTable("orders", (table) => {
    table.dropColumns("price_formatted")
    table.dropColumns("amount_tva_formatted")
    table.double("total_price")
  })

  await knex.schema.renameTable("imageHomePage", "image_home_page")
}

module.exports.down = async (knex) => {
  await knex.schema.alterTable("products", (table) => {
    table.string("price_formatted")
  })

  await knex.schema.alterTable("orders", (table) => {
    table.dropColumns("total_price")
    table.string("amount_tva_formatted")
    table.string("price_formatted")
  })

  await knex.schema.renameTable("image_home_page", "imageHomePage")
}
