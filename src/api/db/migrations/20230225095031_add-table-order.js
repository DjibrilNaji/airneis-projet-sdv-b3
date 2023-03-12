module.exports.up = async (knex) => {
  await knex.schema.createTable("orders", (table) => {
    table.increments("id")
    table.text("numberOrder").notNullable()
    table.text("status").notNullable()
    table.timestamps(true, true, true)
    table.integer("userId").references("id").inTable("users").notNullable()
    table.integer("addressId").references("id").inTable("address").notNullable()
  })
  await knex.schema.createTable("rel_order_product", (table) => {
    table.integer("orderId").references("id").inTable("orders").notNullable()
    table
      .integer("productId")
      .references("id")
      .inTable("products")
      .notNullable()
    table.integer("quantity").notNullable()
  })
}

module.exports.down = async (knex) => {
  await knex.schema.dropTable("rel_order_product")
  await knex.schema.dropTable("orders")
}
