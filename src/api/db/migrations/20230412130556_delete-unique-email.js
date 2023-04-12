module.exports.up = async (knex) => {
    await knex.schema.alterTable("users", (table) => {
      table.dropUnique("email")
    })
  }
  
  module.exports.down = async (knex) => {
    await knex.schema.alterTable("users", (table) => {
      table.string("email").unique()
    })
  }
  