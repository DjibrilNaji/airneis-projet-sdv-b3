module.exports.up = async (knex) => {
  await knex.schema.createTable("contact", (table) => {
    table.increments("id")
    table.text("email").notNullable()
    table.text("subject")
    table.text("message").notNullable()
  })
}

module.exports.down = async (knex) => {
  await knex.schema.dropTable("contact")
}
