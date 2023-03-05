const { faker } = require("@faker-js/faker")

exports.seed = async function (knex) {
  await knex("rel_material_product").del()
  await knex("imageProduct").del()
  await knex("materials").del()
  await knex("products").del()
  await knex("categories").del()

  const categories = []
  const products = []
  const imageProduct = []
  const materialProduct = []
  const materials = []

  const categorieName = ["Bedding", "Storage Sand", "table"]
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
    "TV Stand Alpha1",
    "TV Stand Alpha2",
    "TV Stand Alpha3",
    "TV Stand Alpha4",
    "Dressing Klauss1",
    "Dressing Klauss2",
  ]

  for (let i = 0; i < categorieName.length; i++) {
    categories.push({
      id: i + 1,
      name: categorieName[i],
      description: faker.lorem.sentence(),
      urlImage: categorieName[i].toLowerCase().replace(" ", "") + ".jpg",
    })
  }

  await knex("categories").insert(categories)

  for (let i = 0; i < productName.length; i++) {
    products.push({
      id: i + 1,
      name: productName[i],
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(),
      quantity: faker.datatype.number(100),
      highlander: faker.datatype.number({ min: 0, max: 1 }),
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

  for (let i = 0; i < productName.length; i++) {
    imageProduct.push({
      id: i + 1,
      urlImage: productName[i].toLowerCase().replace(" ", "") + ".jpg",
      productId: i < 14 ? i + 1 : faker.datatype.number({ min: 1, max: 14 }),
    })
  }

  await knex("imageProduct").insert(imageProduct)

  for (let i = 0; i < productName.length; i++) {
    materialProduct.push({
      materialId: i < 5 ? i + 1 : faker.datatype.number({ min: 1, max: 5 }),
      productId: i < 14 ? i + 1 : faker.datatype.number({ min: 1, max: 14 }),
    })
  }

  await knex("rel_material_product").insert(materialProduct)
}
