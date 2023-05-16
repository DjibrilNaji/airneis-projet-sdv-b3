const { faker } = require("@faker-js/faker")

exports.seed = async function (knex) {
  await knex.raw("TRUNCATE TABLE contact RESTART IDENTITY CASCADE")

  const messages = []

  for (let i = 0; i < 15; i++) {
    messages.push({
      email: faker.internet.email(),
      subject: faker.random.word(),
      message: faker.lorem.paragraph(),
    })
  }

  await knex("contact").insert(messages)
}
