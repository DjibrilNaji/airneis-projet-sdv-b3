import config from "@/api/config.js"
import BaseModel from "@/api/db/models/BaseModel.js"
import chalk from "chalk"
import deepmerge from "deepmerge"
import knex from "knex"
import winston from "winston"

const db = knex(config.db)
BaseModel.knex(db)
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.json(),
        winston.format((info) => {
          info[Symbol.for("message")] = `[${chalk[
            info.level === "sql" ? "blue" : "magenta"
          ](info.level)}] ${chalk[
            info.level === "sql" ? "blueBright" : "yellow"
          ](info.message)}`

          return info
        })()
      ),
    }),
  ],
  levels: { ...winston.config.cli.levels, sql: 10 },
  level: 0,
})

db.on("query", ({ sql }) => logger.sql(sql))

const mw = (methodHandlers) => async (req, res) => {
  const methodHandler = methodHandlers[req.method]

  if (!methodHandler) {
    res.status(405).send({ error: "method not allowed" })

    return
  }

  const handlers = Array.isArray(methodHandler)
    ? methodHandler
    : [methodHandler]
  let handlerIndex = 0
  const locals = {}
  const ctx = {
    db,
    logger,
    req,
    res,
    get locals() {
      return locals
    },
    set locals(newLocals) {
      Object.assign(locals, deepmerge(locals, newLocals))
    },
    next: async () => {
      const handler = handlers[handlerIndex]
      handlerIndex += 1

      await handler(ctx)
    },
  }

  await ctx.next()
}

export default mw
