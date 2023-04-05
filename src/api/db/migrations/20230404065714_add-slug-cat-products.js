module.exports.up = async (knex) => {
    await knex.schema.alterTable("categories", (table) => {
      table.string("slug").unique().notNullable()
    })
    await knex.schema.alterTable("products", (table) => {
        table.string("slug").unique().notNullable()
      })
  }
  
  module.exports.down = async (knex) => {
    await knex.schema.alterTable("categories", (table) => {
      table.dropColumns("slug")
    })
    await knex.schema.alterTable("products", (table) => {
        table.dropColumns("slug")
      })
  }