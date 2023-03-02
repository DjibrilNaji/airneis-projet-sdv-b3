const { faker } = require("@faker-js/faker")

exports.seed = async function (knex) {
  await knex("rel_material_product").del()
  await knex("imageProduct").del()
  await knex("materials").del()
  await knex("products").del()
  await knex("categories").del()

  const categories = []
  const categorieName = ["bedding", "storageSand", "table"]
  const products = []
  const imageProduct = []
  const materialProduct = []
  const materials = []

  const productName = [
    "buffet",
    "coffeTable",
    "doubleBed",
    "dressing",
    "extandableTable",
    "kingSize",
    "superposeBed",
    "marbleTable",
    "queenSize",
    "roundTable",
    "shoeStorage",
    "simpleBed",
    "squareTable",
    "tvStand",
  ]

  for (let i = 0; i < 3; i++) {
    categories.push({
      id: i + 1,
      categoryName: categorieName[i],
      description: faker.lorem.sentence(),
      urlImage: categorieName[i] + ".jpg",
    })
  }

  await knex("categories").insert(categories)

  for (let i = 0; i < 14; i++) {
    products.push({
      id: i + 1,
      name: productName[i],
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(),
      quantity: faker.datatype.number(100),
      categoryId: faker.datatype.number({ min: 1, max: 3 }),
    })
  }

  await knex("products").insert(products)

  for (let i = 0; i < 5; i++) {
    materials.push({
      id: i + 1,
      nameMaterial: faker.commerce.productMaterial(),
    })
  }

  await knex("materials").insert(materials)

  for (let i = 0; i < 14; i++) {
    imageProduct.push({
      id: i + 1,
      urlImage: productName[i] + ".jpg",
      productId: faker.datatype.number({ min: 1, max: 14 }),
    })
  }

  await knex("imageProduct").insert(imageProduct)

  for (let i = 0; i < 14; i++) {
    materialProduct.push({
      materialId: faker.datatype.number({ min: 1, max: 5 }),
      productId: faker.datatype.number({ min: 1, max: 14 }),
    })
  }

  await knex("rel_material_product").insert(materialProduct)
}
