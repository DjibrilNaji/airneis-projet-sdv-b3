module.exports.up = async (knex) => {
  await knex.schema.createTable("users", (table) => {
    table.increments("id")
    table.text("userName").notNullable()
    table.text("firstName").notNullable()
    table.text("lastName").notNullable()
    table.text("email").notNullable().unique()
    table.text("passwordHash").notNullable()
    table.text("passwordSalt").notNullable()
    table.timestamps(true, true, true)
    table.boolean("validate").notNullable().defaultTo(0)
    table.boolean("role").notNullable().defaultTo(0)
  })
  await knex.schema.createTable("address", (table) => {
    table.increments("id")
    table.text("firstName").notNullable()
    table.text("lastName").notNullable()
    table.text("addressFull").notNullable()
    table.text("addressOptional")
    table.text("city").notNullable()
    table.integer("cp").notNullable()
    table.text("country").notNullable()
    table.text("phoneNumber").notNullable()
    table.integer("userId").references("id").inTable("users").notNullable()
  })
  await knex.schema.createTable("billingAddress", (table) => {
    table.increments("id")
    table.text("addressFull").notNullable()
    table.text("city").notNullable()
    table.integer("cp").notNullable()
    table.text("country").notNullable()
    table.text("phoneNumber").notNullable()
    table.integer("userId").references("id").inTable("users").notNullable()
  })
}

module.exports.down = async (knex) => {
  await knex.schema.dropTable("billingAddress")
  await knex.schema.dropTable("address")
  await knex.schema.dropTable("users")
}
