module.exports.up = async (knex) => {
  await knex.schema.createTable("categories", (table) => {
    table.increments("id")
    table.text("categoryName").notNullable()
    table.text("description").notNullable()
    table.text("urlImage").notNullable()
  })
  await knex.schema.createTable("products", (table) => {
    table.increments("id")
    table.text("name").notNullable()
    table.text("description").notNullable()
    table.float("price").notNullable()
    table.integer("quantity").notNullable()
    table
      .integer("categoryId")
      .references("id")
      .inTable("categories")
      .notNullable()
  })
  await knex.schema.createTable("imageProduct", (table) => {
    table.increments("id")
    table.text("urlImage").notNullable()
    table
      .integer("productId")
      .references("id")
      .inTable("products")
      .notNullable()
  })
  await knex.schema.createTable("materials", (table) => {
    table.increments("id")
    table.text("nameMaterial").notNullable()
  })
  await knex.schema.createTable("rel_material_product", (table) => {
    table
      .integer("productId")
      .references("id")
      .inTable("products")
      .notNullable()
    table
      .integer("materialId")
      .references("id")
      .inTable("materials")
      .notNullable()
  })
}

module.exports.down = async (knex) => {
  await knex.schema.dropTable("rel_material_product")
  await knex.schema.dropTable("materials")
  await knex.schema.dropTable("imageProduct")
  await knex.schema.dropTable("products")
  await knex.schema.dropTable("categories")
}
