const { faker } = require("@faker-js/faker")

exports.seed = async function (knex) {
  await knex("contact").del()

  const messages = []

  for (let i = 0; i < 15; i++) {
    messages.push({
      id: i + 1,
      email: faker.internet.email(),
      subject: faker.random.word(),
      message: faker.lorem.paragraph(),
    })
  }

  await knex("contact").insert(messages)
}
