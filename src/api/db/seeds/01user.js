const { pbkdf2, randomBytes } = require("node:crypto")
const { promisify } = require("node:util")

exports.seed = async function (knex) {
  await knex.raw("TRUNCATE TABLE billing_address RESTART IDENTITY CASCADE")
  await knex.raw("TRUNCATE TABLE address RESTART IDENTITY CASCADE")
  await knex.raw("TRUNCATE TABLE users RESTART IDENTITY CASCADE")
  await knex.raw("TRUNCATE TABLE contact RESTART IDENTITY CASCADE")

  const [passwordHash, passwordSalt] = await hashPassword("Password123?")

  const messages = [
    {
      email: "john.doe@example.com",
      subject: "Question sur les promotions",
      message:
        "Bonjour, je souhaiterais savoir si vous avez des promotions en cours sur les meubles de salon ? Merci d'avance pour votre réponse.",
    },
    {
      email: "jane.doe@example.com",
      subject: "Problème avec la livraison",
      message:
        "Bonjour, j'ai passé une commande de meubles il y a une semaine et je devais être livré hier, mais je n'ai toujours rien reçu. Pouvez-vous m'indiquer où en est ma commande s'il vous plaît ?",
    },
    {
      email: "admin@example.com",
      subject: "Réponse à votre demande",
      message:
        "Bonjour, nous avons bien pris en compte votre demande de renseignements. Nous vous informons que nos promotions en cours sont disponibles sur notre site internet. N'hésitez pas à nous contacter si vous avez besoin de plus d'informations.",
    },
    {
      email: "johndoe@example.com",
      subject: "Demande de retour",
      message:
        "Bonjour, j'ai reçu ma commande hier et je souhaiterais la retourner car les meubles ne correspondent pas à mes attentes. Pouvez-vous m'indiquer la marche à suivre pour le retour et le remboursement s'il vous plaît ?",
    },
    {
      email: "janedoe@example.com",
      subject: "Problème avec le montage",
      message:
        "Bonjour, j'ai récemment acheté des meubles chez vous et j'ai rencontré un problème lors du montage. En effet, certaines pièces manquent et je ne peux pas assembler les meubles. Pouvez-vous m'envoyer les pièces manquantes s'il vous plaît ?",
    },
    {
      email: "admin@example.com",
      subject: "Confirmation de commande",
      message:
        "Bonjour, nous vous confirmons que votre commande de meubles a bien été prise en compte et sera livrée sous 10 jours ouvrés. N'hésitez pas à nous contacter si vous avez des questions.",
    },
    {
      email: "johndoe@example.com",
      subject: "Demande d'informations",
      message:
        "Bonjour, je souhaiterais obtenir des informations sur les dimensions d'un canapé que vous proposez. Pouvez-vous me donner les dimensions précises s'il vous plaît ?",
    },
    {
      email: "johndoe@example.com",
      subject: "Problème de paiement",
      message:
        "Bonjour, j'ai passé une commande de meubles il y a quelques jours et j'ai rencontré un problème lors du paiement en ligne. En effet, le paiement a été refusé alors que j'ai suffisamment de fonds sur mon compte. Pouvez-vous m'indiquer la raison du refus et m'aider à trouver une solution pour finaliser ma commande ?",
    },
    {
      email: "janedoe@example.com",
      subject: "Demande de remboursement",
      message:
        "Bonjour, j'ai passé une commande de meubles il y a deux semaines et je devais être livrée hier. Cependant, je n'ai toujours rien reçu et j'ai décidé d'annuler ma commande et de demander un remboursement. Pouvez-vous m'indiquer la marche à suivre pour le remboursement s'il vous plaît ?",
    },
    {
      email: "admin@example.com",
      subject: "Confirmation de livraison",
      message:
        "Bonjour, nous vous confirmons que votre commande de meubles a été livrée ce matin à l'adresse que vous nous avez indiquée. N'hésitez pas à nous contacter si vous avez des questions ou des remarques sur votre commande.",
    },
  ]

  await knex("contact").insert(messages)

  const users = [
    {
      userName: "john.doe",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      passwordHash: passwordHash,
      passwordSalt: passwordSalt,
      isAdmin: true,
      isDelete: false,
      validate: true,
    },
    {
      userName: "jane.doe",
      firstName: "Jane",
      lastName: "Doe",
      email: "jane.doe@example.com",
      passwordHash: passwordHash,
      passwordSalt: passwordSalt,
      isAdmin: true,
      isDelete: false,
      validate: false,
    },
    {
      userName: "bob.smith",
      firstName: "Bob",
      lastName: "Smith",
      email: "bob.smith@example.com",
      passwordHash: passwordHash,
      passwordSalt: passwordSalt,
      isAdmin: false,
      isDelete: false,
      validate: true,
    },
    {
      userName: "alice.smith",
      firstName: "Alice",
      lastName: "Smith",
      email: "alice.smith@example.com",
      passwordHash: passwordHash,
      passwordSalt: passwordSalt,
      isAdmin: false,
      isDelete: false,
      validate: true,
    },
    {
      userName: "samuel.jackson",
      firstName: "Samuel",
      lastName: "Jackson",
      email: "samuel.jackson@example.com",
      passwordHash: passwordHash,
      passwordSalt: passwordSalt,
      isAdmin: false,
      isDelete: true,
      validate: false,
    },
    {
      userName: "susan.white",
      firstName: "Susan",
      lastName: "White",
      email: "susan.white@example.com",
      passwordHash: passwordHash,
      passwordSalt: passwordSalt,
      isAdmin: false,
      isDelete: false,
      validate: false,
    },
    {
      userName: "michael.green",
      firstName: "Michael",
      lastName: "Green",
      email: "michael.green@example.com",
      passwordHash: passwordHash,
      passwordSalt: passwordSalt,
      isAdmin: false,
      isDelete: false,
      validate: false,
    },
    {
      userName: "amy.brown",
      firstName: "Amy",
      lastName: "Brown",
      email: "amy.brown@example.com",
      passwordHash: passwordHash,
      passwordSalt: passwordSalt,
      isAdmin: false,
      isDelete: false,
      validate: false,
    },
    {
      userName: "charles.jones",
      firstName: "Charles",
      lastName: "Jones",
      email: "charles.jones@example.com",
      passwordHash: passwordHash,
      passwordSalt: passwordSalt,
      isAdmin: false,
      isDelete: false,
      validate: true,
    },
    {
      userName: "emily.wilson",
      firstName: "Emily",
      lastName: "Wilson",
      email: "emily.wilson@example.com",
      passwordHash: passwordHash,
      passwordSalt: passwordSalt,
      isAdmin: false,
      isDelete: true,
      validate: false,
    },
    {
      userName: "peter.taylor",
      firstName: "Peter",
      lastName: "Taylor",
      email: "peter.taylor@example.com",
      passwordHash: passwordHash,
      passwordSalt: passwordSalt,
      isAdmin: false,
      isDelete: false,
      validate: false,
    },
    {
      userName: "olivia.miller",
      firstName: "Olivia",
      lastName: "Miller",
      email: "olivia.miller@example.com",
      passwordHash: passwordHash,
      passwordSalt: passwordSalt,
      isAdmin: false,
      isDelete: false,
      validate: true,
    },
    {
      userName: "thomas.harris",
      firstName: "Thomas",
      lastName: "Harris",
      email: "thomas.harris@example.com",
      passwordHash: passwordHash,
      passwordSalt: passwordSalt,
      isAdmin: false,
      isDelete: false,
      validate: false,
    },
    {
      userName: "elizabeth.baker",
      firstName: "Elizabeth",
      lastName: "Baker",
      email: "elizabeth.baker@example.com",
      passwordHash: passwordHash,
      passwordSalt: passwordSalt,
      isAdmin: false,
      isDelete: false,
      validate: false,
    },
    {
      userName: "george.nelson",
      firstName: "George",
      lastName: "Nelson",
      email: "george.nelson@example.com",
      passwordHash: passwordHash,
      passwordSalt: passwordSalt,
      isAdmin: false,
      isDelete: false,
      validate: true,
    },
  ]
  await knex("users").insert(users)

  const billingAddress = [
    {
      addressFull: "10 Downing Street",
      city: "London",
      cp: 8000,
      country: "United Kingdom",
      phoneNumber: 5551234,
      userId: 1,
    },
    {
      addressFull: "1600 Pennsylvania Avenue NW",
      city: "Washington",
      cp: 8000,
      country: "United States",
      phoneNumber: 5551234,
      userId: 2,
    },
    {
      addressFull: "Leidseplein 26",
      city: "Amsterdam",
      cp: 8000,
      country: "Netherlands",
      phoneNumber: 5551234,
      userId: 3,
    },
    {
      addressFull: "Via del Corso, 503",
      city: "Rome",
      cp: 8000,
      country: "Italy",
      phoneNumber: 5551234,
      userId: 4,
    },
    {
      addressFull: "Passeig de Gracia, 92",
      city: "Barcelona",
      cp: 8000,
      country: "Spain",
      phoneNumber: 5551234,
      userId: 5,
    },
    {
      addressFull: "Friedrichstraße 176-179",
      city: "Berlin",
      cp: 8000,
      country: "Germany",
      phoneNumber: 5551234,
      userId: 6,
    },
    {
      addressFull: "Av. de los Insurgentes Sur 553",
      city: "Mexico City",
      cp: 8000,
      country: "Mexico",
      phoneNumber: 5551234,
      userId: 7,
    },
    {
      addressFull: "Paseo de la Reforma 222",
      city: "Mexico City",
      cp: 8000,
      country: "Mexico",
      phoneNumber: 5551234,
      userId: 8,
    },
    {
      addressFull: "Tverskaya Ulitsa, 9",
      city: "Moscow",
      cp: 8000,
      country: "Russia",
      phoneNumber: 5551234,
      userId: 9,
    },
    {
      addressFull: "2 Chome-2-1 Nishishinjuku",
      city: "Tokyo",
      cp: 8000,
      country: "Japan",
      phoneNumber: 5551234,
      userId: 10,
    },
    {
      addressFull: "1000 Independence Ave SW",
      city: "Washington",
      cp: 8000,
      country: "United States",
      phoneNumber: 5551234,
      userId: 11,
    },
    {
      addressFull: "13 Rue des Lilas",
      city: "Marseille",
      cp: 8000,
      country: "France",
      phoneNumber: 5551234,
      userId: 12,
    },
    {
      addressFull: "7 Avenue des Roses",
      city: "Lyon",
      cp: 8000,
      country: "France",
      phoneNumber: 5551234,
      userId: 13,
    },
    {
      addressFull: "18 Rue des Champs",
      city: "Lille",
      cp: 8000,
      country: "France",
      phoneNumber: 5551234,
      userId: 14,
    },
    {
      addressFull: "22 Boulevard des Oliviers",
      city: "Nice",
      cp: 8000,
      country: "France",
      phoneNumber: 5551234,
      userId: 15,
    },
  ]
  await knex("billing_address").insert(billingAddress)

  const address = [
    {
      firstName: "John",
      lastName: "Doe",
      addressFull: "123 Main St",
      city: "New York",
      cp: 8000,
      country: "USA",
      phoneNumber: 5551234,
      userId: 1,
      isDelete: false,
      address_default: true,
    },
    {
      firstName: "Alice",
      lastName: "Johnson",
      addressFull: "456 Maple Ave",
      city: "Los Angeles",
      cp: 8000,
      country: "USA",
      phoneNumber: 5551234,
      userId: 1,
      isDelete: false,
      address_default: false,
    },
    {
      firstName: "Jane",
      lastName: "Doe",
      addressFull: "101 Elm St",
      city: "San Francisco",
      cp: 8000,
      country: "USA",
      phoneNumber: 5551234,
      userId: 2,
      isDelete: false,
      address_default: true,
    },
    {
      firstName: "Bob",
      lastName: "Lee",
      addressFull: "789 Oak St",
      city: "Chicago",
      cp: 8000,
      country: "USA",
      phoneNumber: 5551234,
      userId: 2,
      isDelete: true,
      address_default: false,
    },
    {
      firstName: "Bob",
      lastName: "Smith",
      addressFull: "404 Birch St",
      city: "Miami",
      cp: 8000,
      country: "USA",
      phoneNumber: 5551234,
      userId: 3,
      isDelete: false,
      address_default: true,
    },
    {
      firstName: "David",
      lastName: "Park",
      addressFull: "202 Pine St",
      city: "Boston",
      cp: 8000,
      country: "USA",
      phoneNumber: 5551234,
      userId: 3,
      isDelete: true,
      address_default: false,
    },
    {
      firstName: "Alice",
      lastName: "Smith",
      addressFull: "707 Maple Ave",
      city: "Atlanta",
      cp: 8000,
      country: "USA",
      phoneNumber: 5551234,
      userId: 4,
      isDelete: false,
      address_default: true,
    },
    {
      firstName: "Karen",
      lastName: "Kim",
      addressFull: "303 Cedar St",
      city: "Seattle",
      cp: 8000,
      country: "USA",
      phoneNumber: 5551234,
      userId: 4,
      address_default: false,
    },
    {
      firstName: "Samuel",
      lastName: "Jackson",
      addressFull: "1234 Hollywood Blvd",
      city: "Los Angeles",
      cp: 8000,
      country: "USA",
      phoneNumber: 5551234,
      userId: 5,
      isDelete: false,
      address_default: true,
    },
    {
      firstName: "Lucy",
      lastName: "Lin",
      addressFull: "505 Spruce St",
      city: "Houston",
      cp: 8000,
      country: "USA",
      phoneNumber: 5551234,
      userId: 5,
      isDelete: false,
      address_default: false,
    },
    {
      firstName: "Susan",
      lastName: "White",
      addressFull: "4321 Main St",
      city: "Chicago",
      cp: 8000,
      country: "USA",
      phoneNumber: 5551234,
      userId: 6,
      isDelete: false,
      address_default: false,
    },
    {
      firstName: "Steve",
      lastName: "Liu",
      addressFull: "606 Oak St",
      city: "Dallas",
      cp: 8000,
      country: "USA",
      phoneNumber: 5551234,
      userId: 6,
      isDelete: false,
      address_default: true,
    },
    {
      firstName: "Michael",
      lastName: "Green",
      addressFull: "5678 Market St",
      city: "San Francisco",
      cp: 8000,
      country: "USA",
      phoneNumber: 5551234,
      userId: 7,
      isDelete: false,
      address_default: true,
    },
    {
      firstName: "Amy",
      lastName: "Brown",
      addressFull: "9876 Elm St",
      city: "New York",
      cp: 8000,
      country: "USA",
      phoneNumber: 5551234,
      userId: 8,
      isDelete: false,
      address_default: true,
    },
    {
      firstName: "Charles",
      lastName: "Jones",
      addressFull: "2468 Park Ave",
      city: "Boston",
      cp: 8000,
      country: "USA",
      phoneNumber: 5551234,
      userId: 9,
      isDelete: false,
      address_default: true,
    },
    {
      firstName: "Emily",
      lastName: "Wilson",
      addressFull: "1357 Broadway",
      city: "Seattle",
      cp: 8000,
      country: "USA",
      phoneNumber: 5551234,
      userId: 10,
      isDelete: false,
      address_default: true,
    },
    {
      firstName: "Peter",
      lastName: "Taylor",
      addressFull: "3695 Sunset Blvd",
      city: "Los Angeles",
      cp: 8000,
      country: "USA",
      phoneNumber: 5551234,
      userId: 11,
      isDelete: false,
      address_default: true,
    },
    {
      firstName: "Olivia",
      lastName: "Miller",
      addressFull: "2580 Vine St",
      city: "Los Angeles",
      cp: 8000,
      country: "USA",
      phoneNumber: 5551234,
      userId: 12,
      isDelete: false,
      address_default: true,
    },
    {
      firstName: "Thomas",
      lastName: "Harris",
      addressFull: "8765 Wilshire Blvd",
      city: "Beverly Hills",
      cp: 8000,
      country: "USA",
      phoneNumber: 5551234,
      userId: 13,
      isDelete: false,
      address_default: true,
    },
    {
      firstName: "Elizabeth",
      lastName: "Baker",
      addressFull: "6543 Rodeo Dr",
      city: "Beverly Hills",
      cp: 8000,
      country: "USA",
      phoneNumber: 5551234,
      userId: 14,
      isDelete: false,
      address_default: true,
    },
    {
      firstName: "George",
      lastName: "Nelson",
      addressFull: "1255 Elm St",
      city: "Los Angeles",
      cp: 8000,
      country: "USA",
      phoneNumber: 5551234,
      userId: 15,
      isDelete: false,
      address_default: true,
    },
  ]
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
