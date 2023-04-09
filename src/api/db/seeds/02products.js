const { faker } = require("@faker-js/faker")

exports.seed = async function (knex) {
  await knex.raw("TRUNCATE TABLE rel_material_product RESTART IDENTITY CASCADE")
  await knex.raw("TRUNCATE TABLE image_product RESTART IDENTITY CASCADE")
  await knex.raw("TRUNCATE TABLE materials RESTART IDENTITY CASCADE")
  await knex.raw("TRUNCATE TABLE products RESTART IDENTITY CASCADE")
  await knex.raw("TRUNCATE TABLE categories RESTART IDENTITY CASCADE")

  const categories = []
  const products = []
  const imageProduct = []
  const materialProduct = []
  const materials = []

  const categorieName = ["Bedding", "Storage Sand", "Table"]
  const productName = [
    "Buffet",
    "Coffee Table",
    "Double Bed",
    "Dressing",
    "Extandable Table",
    "King Size",
    "Superpose Bed",
    "Marble Table",
    "Queen Size",
    "Round Table",
    "Shoe Storage",
    "Simple Bed",
    "Square Table",
    "TV Stand",
    "TV StandAlpha1",
    "TV StandAlpha2",
    "TV StandAlpha3",
    "TV StandAlpha4",
    "Dressing Klauss1",
    "Dressing Klauss2",
  ]

  for (let i = 0; i < categorieName.length; i++) {
    categories.push({
      name: categorieName[i],
      slug: faker.lorem.slug(),
      description: faker.lorem.sentence(),
      urlImage: categorieName[i].toLowerCase().replace(" ", "") + ".jpg",
    })
  }

  await knex("categories").insert(categories)

  for (let i = 0; i < 14; i++) {
    products.push({
      name: productName[i],
      slug: faker.lorem.slug(),
      description: faker.commerce.productDescription(),
      price: (100 * i).toFixed(2),
      price_formatted: ((100 * i).toFixed(2)).toString() + " €",
      quantity: faker.datatype.number(100),
      highlander: faker.datatype.number({ min: 0, max: 1 }),
      categoryId: faker.datatype.number({ min: 1, max: 3 }),
    })
  }

  await knex("products").insert(products)

  for (let i = 0; i < 5; i++) {
    materials.push({
      nameMaterial: faker.commerce.productMaterial(),
    })
  }

  await knex("materials").insert(materials)

  for (let i = 0; i < productName.length; i++) {
    imageProduct.push({
      urlImage: productName[i].toLowerCase().replace(" ", "") + ".jpg",
      productId: i < 14 ? i + 1 : faker.datatype.number({ min: 1, max: 14 }),
    })
  }

  await knex("image_product").insert(imageProduct)

  for (let i = 0; i < productName.length; i++) {
    materialProduct.push({
      materialId: i < 5 ? i + 1 : faker.datatype.number({ min: 1, max: 5 }),
      productId: i < 14 ? i + 1 : faker.datatype.number({ min: 1, max: 14 }),
    })
  }

  await knex("rel_material_product").insert(materialProduct)
}
