module.exports.up = async (knex) => {
  await knex.schema.createTable("favorites", (table) => {
    table.increments("id")
    table
      .integer("productId")
      .references("id")
      .inTable("products")
      .notNullable()
    table.integer("userId").references("id").inTable("users").notNullable()
  })
}

module.exports.down = async (knex) => {
  await knex.schema.dropTable("favorites")
}
