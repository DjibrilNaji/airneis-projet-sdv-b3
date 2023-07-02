exports.seed = async function (knex) {
  await knex.raw("TRUNCATE TABLE rel_order_product RESTART IDENTITY CASCADE")
  await knex.raw("TRUNCATE TABLE orders RESTART IDENTITY CASCADE")

  const orders = [
    {
      numberOrder: "ORD1234",
      status: "Delivered",
      createdAt: "2023-05-10 00:00:00.540005+01",
      price: 149.96,
      amount_tva: 29.99,
      total_price: 179.95,
      userId: 1,
      addressId: 2,
    },
    {
      numberOrder: "ORD5678",
      status: "On standby",
      createdAt: "2023-05-11 00:00:00.540005+01",
      price: 599.99,
      amount_tva: 120.0,
      total_price: 719.99,
      userId: 5,
      addressId: 2,
    },
    {
      numberOrder: "ORD9876",
      status: "Cancelled",
      createdAt: "2023-05-12 00:00:00.540005+01",
      price: 949.98,
      amount_tva: 190.0,
      total_price: 1139.98,
      userId: 10,
      addressId: 2,
    },
    {
      numberOrder: "ORD5432",
      status: "Delivered",
      createdAt: "2023-05-13 00:00:00.540005+01",
      price: 799.99,
      amount_tva: 160.0,
      total_price: 959.99,
      userId: 9,
      addressId: 2,
    },
    {
      numberOrder: "ORD8765",
      status: "On standby",
      createdAt: "2023-05-14 00:00:00.540005+01",
      price: 239.96,
      amount_tva: 47.99,
      total_price: 287.95,
      userId: 2,
      addressId: 2,
    },
    {
      numberOrder: "ORD4321",
      status: "Delivered",
      createdAt: "2023-05-15 00:00:00.540005+01",
      price: 599.98,
      amount_tva: 120.0,
      total_price: 719.98,
      userId: 6,
      addressId: 2,
    },
    {
      numberOrder: "ORD6543",
      status: "Cancelled",
      createdAt: "2023-05-16 00:00:00.540005+01",
      price: 309.97,
      amount_tva: 61.99,
      total_price: 371.96,
      userId: 2,
      addressId: 2,
    },
    {
      numberOrder: "ORD1234",
      status: "Delivered",
      createdAt: "2023-06-25 00:00:00.540005+01",
      price: 309.97,
      amount_tva: 61.99,
      total_price: 371.96,
      userId: 2,
      addressId: 2,
    },
    {
      numberOrder: "ORD1274",
      status: "Delivered",
      createdAt: "2023-06-26 00:00:00.540005+01",
      price: 309.97,
      amount_tva: 61.99,
      total_price: 570,
      userId: 2,
      addressId: 2,
    },
    {
      numberOrder: "ORD1374",
      status: "Delivered",
      createdAt: "2023-06-23 00:00:00.540005+01",
      price: 309.97,
      amount_tva: 61.99,
      total_price: 862,
      userId: 2,
      addressId: 2,
    },
    {
      numberOrder: "ORD1275",
      status: "Delivered",
      createdAt: "2023-06-15 00:00:00.540005+01",
      price: 309.97,
      amount_tva: 61.99,
      total_price: 234,
      userId: 2,
      addressId: 2,
    },
  ]

  await knex("orders").insert(orders)

  const relOrderProduct = [
    { orderId: 1, productId: 66, quantity: 2 },
    { orderId: 1, productId: 81, quantity: 2 },

    { orderId: 2, productId: 40, quantity: 1 },

    { orderId: 3, productId: 1, quantity: 1 },
    { orderId: 3, productId: 31, quantity: 1 },

    { orderId: 4, productId: 23, quantity: 1 },

    { orderId: 5, productId: 56, quantity: 1 },
    { orderId: 5, productId: 58, quantity: 1 },
    { orderId: 5, productId: 66, quantity: 2 },

    { orderId: 6, productId: 13, quantity: 2 },

    { orderId: 7, productId: 90, quantity: 2 },
    { orderId: 7, productId: 74, quantity: 1 },

    { orderId: 8, productId: 31, quantity: 2 },
    { orderId: 8, productId: 74, quantity: 1 },

    { orderId: 9, productId: 66, quantity: 2 },
    { orderId: 9, productId: 74, quantity: 1 },

    { orderId: 10, productId: 56, quantity: 2 },
    { orderId: 10, productId: 58, quantity: 1 },

    { orderId: 11, productId: 23, quantity: 6 },
    { orderId: 11, productId: 31, quantity: 1 },
  ]

  await knex("rel_order_product").insert(relOrderProduct)
}
