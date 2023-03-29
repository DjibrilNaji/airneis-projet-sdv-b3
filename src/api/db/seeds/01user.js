const { faker } = require("@faker-js/faker")
const { pbkdf2, randomBytes } = require("node:crypto")
const { promisify } = require("node:util")

exports.seed = async function (knex) {
  await knex("rel_order_product").del()
  await knex("orders").del()
  await knex("billingAddress").del()
  await knex("address").del()
  await knex("users").del()
  const users = []
  const billingAddress = []
  const address = []

  for (let i = 0; i < 30; i++) {
    const [passwordHash, passwordSalt] = await hashPassword("Testmdp123?")
    users.push({
      id: i + 1,
      userName: faker.internet.userName(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      passwordHash: passwordHash,
      passwordSalt: passwordSalt,
    })
  }
  await knex("users").insert(users)

  for (let i = 0; i < 3; i++) {
    billingAddress.push({
      id: i + 1,
      addressFull: faker.address.streetAddress(),
      city: faker.address.city(),
      cp: faker.datatype.number({ min: 0, max: 99999 }),
      country: faker.address.country(),
      phoneNumber: faker.phone.number(),
      userId: i + 1,
    })
  }
  await knex("billingAddress").insert(billingAddress)

  for (let i = 0; i < 5; i++) {
    address.push({
      id: i + 1,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      addressFull: faker.address.streetAddress(),
      city: faker.address.city(),
      cp: faker.datatype.number({ min: 0, max: 99999 }),
      country: faker.address.country(),
      phoneNumber: faker.phone.number(),
      userId: i < 3 ? i + 1 : faker.datatype.number({ min: 1, max: 3 }),
    })
  }
  await knex("address").insert(address)
}

const pbkdf2Callback = promisify(pbkdf2)
const hashPassword = async (
  password,
  salt = randomBytes(512).toString("hex")
) => [
  (
    await pbkdf2Callback(
      `${password}${"bjvbkqfdjkvlqdvl54vf64f5f"}`,
      salt,
      100000,
      512,
      "sha512"
    )
  ).toString("hex"),
  salt,
]
