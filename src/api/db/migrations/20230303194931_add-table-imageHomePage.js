module.exports.up = async (knex) => {
  await knex.schema.createTable("imageHomePage", (table) => {
    table.increments("id")
    table.text("urlImage").notNullable()
    table.boolean("display").notNullable().defaultTo(0)
  })
}

module.exports.down = async (knex) => {
  await knex.schema.dropTable("imageHomePage")
}
