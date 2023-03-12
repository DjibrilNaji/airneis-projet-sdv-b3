const { resolve } = require("path")
const { config } = require("dotenv")

config()

const knexfile = {
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  migrations: {
    directory: resolve("src/api/db/migrations"),
    stub: resolve("src/api/db/migration.stub"),
  },
  seeds: {
    directory: resolve("src/api/db/seeds"),
  },
}

module.exports = knexfile
