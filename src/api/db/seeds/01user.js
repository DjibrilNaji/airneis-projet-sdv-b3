const { faker } = require("@faker-js/faker")
const { pbkdf2, randomBytes } = require("node:crypto")
const { promisify } = require("node:util")

exports.seed = async function (knex) {
  await knex.raw("TRUNCATE TABLE rel_order_product RESTART IDENTITY CASCADE")
  await knex.raw("TRUNCATE TABLE orders RESTART IDENTITY CASCADE")
  await knex.raw("TRUNCATE TABLE billing_address RESTART IDENTITY CASCADE")
  await knex.raw("TRUNCATE TABLE address RESTART IDENTITY CASCADE")
  await knex.raw("TRUNCATE TABLE users RESTART IDENTITY CASCADE")

  const users = []
  const billingAddress = []
  const address = []

  for (let i = 0; i < 30; i++) {
    const [passwordHash, passwordSalt] = await hashPassword("Testmdp123?")

    const booleanRandom = Math.random() < 0.5

    users.push({
      userName: faker.internet.userName(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      passwordHash: passwordHash,
      passwordSalt: passwordSalt,
      isAdmin: booleanRandom,
      isDelete: booleanRandom,
    })
  }
  await knex("users").insert(users)

  for (let i = 0; i < 3; i++) {
    billingAddress.push({
      addressFull: faker.address.streetAddress(),
      city: faker.address.city(),
      cp: faker.datatype.number({ min: 0, max: 99999 }),
      country: faker.address.country(),
      phoneNumber: faker.phone.number(),
      userId: i + 1,
    })
  }
  await knex("billing_address").insert(billingAddress)

  for (let i = 0; i < 5; i++) {
    address.push({
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
