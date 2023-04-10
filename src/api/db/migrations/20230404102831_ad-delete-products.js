module.exports.up = async (knex) => {
    await knex.schema.alterTable("products", (table) => {
      table.boolean("isDelete").default(false)
    })
  }
  
  module.exports.down = async (knex) => {
    await knex.schema.alterTable("products", (table) => {
      table.dropColumns("isDelete")
    })
  }