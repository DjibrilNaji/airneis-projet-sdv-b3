const { faker } = require("@faker-js/faker")

exports.seed = async function (knex) {
  await knex("rel_order_product").del()
  await knex("orders").del()
  const orders = []
  const relOrderProduct = []
  const status = ["Delivered", "On standby", "Cancelled"]
  const dateCreation = [
    "2020-12-02 00:00:00.540005+01",
    "2021-09-05 00:00:00.540005+01",
    "2022-01-01 00:00:00.540005+01",
    "2023-03-01 00:00:00.540005+01",
    "2021-06-18 00:00:00.540005+01",
    "2022-07-12 00:00:00.540005+01",
  ]

  for (let i = 0; i < 6; i++) {
    orders.push({
      id: i + 1,
      numberOrder: faker.random.alphaNumeric(10),
      status: status[faker.datatype.number({ min: 0, max: 2 })],
      createdAt: dateCreation[i],
      price: (100 * i).toFixed(2),
      price_formatted: ((100 * i).toFixed(2)).toString() + " €",
      amount_tva: ((100 * i)*0.21).toFixed(2),
      amount_tva_formatted: (((100 * i)*0.21).toFixed(2)).toString() + " €",
      userId: i < 3 ? i + 1 : i === 3 ? i : i - 3,
      addressId: i < 3 ? i + 1 : i === 3 ? i : i - 3,
    })
  }
  await knex("orders").insert(orders)

  for (let i = 0; i < 10; i++) {
    relOrderProduct.push({
      orderId: i < 6 ? i + 1 : faker.datatype.number({ min: 1, max: 6 }),
      productId: faker.datatype.number({ min: 1, max: 14 }),
      quantity: faker.datatype.number({ min: 1, max: 7 }),
    })
  }
  await knex("rel_order_product").insert(relOrderProduct)
}
