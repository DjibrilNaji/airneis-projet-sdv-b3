module.exports.up = async (knex) => {
  await knex.schema.createTable("imageHomePage", (table) => {
    table.increments("id")
    table.text("urlImage").notNullable()
    table.boolean("display").notNullable()
  })
}

module.exports.down = async (knex) => {
  await knex.schema.dropTable("imageHomePage")
}
