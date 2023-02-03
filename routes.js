const express = require("express")
const MongoClient = require("mongodb").MongoClient
const bodyParser = require("body-parser")

const router = express.Router()

// body-parser
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())
const jsonParser = bodyParser.json()

// Products
router.get("/products", (req, res) => {
  MongoClient.connect(
    process.env.MONGODB_URL,
    { useNewUrlParser: true },
    (err, client) => {
      if (err) {
        throw err
      }
      
      const db = client.db(process.env.DB_NAME)
      const products = db.collection("products")

      products.find({}).toArray((err, result) => {
        if (err) {
          throw err
        }

        res.json(result)
        client.close()
      })
    }
  )
})

router.get("/orders", (req, res) => {
  MongoClient.connect(
    process.env.MONGODB_URL,
    { useNewUrlParser: true },
    (err, client) => {
      if (err) {
        throw err
      }

      const db = client.db(process.env.DB_NAME)
      const orders = db.collection("orders")

      orders
        .find({})
        .sort({ dateOfOrder: -1 })
        .toArray((err, result) => {
          if (err) {
            throw err
          }

          res.json(result)
          client.close()
        })
    }
  )
})

// Categories
router.get("/categories", (req, res) => {
  MongoClient.connect(
    process.env.MONGODB_URL,
    { useNewUrlParser: true },
    (err, client) => {
      if (err) {
        throw err
      }

      const db = client.db(process.env.DB_NAME)
      const categories = db.collection("categories")

      categories.find({}).toArray((err, result) => {
        if (err) {
          throw err
        }

        res.json(result)
        client.close()
      })
    }
  )
})

// Users
router.post("/users/add", jsonParser, (req, res) => {
  MongoClient.connect(
    process.env.MONGODB_URL,
    { useNewUrlParser: true },
    (err, client) => {
      if (err) {
        throw err
      }
      const db = client.db(process.env.DB_NAME)
      const products = db.collection("users")


      products
        .insertOne(req.body)
        .then(() => res.status(200).send("successfully inserted new document"))
        .catch((err) => {
          res.send(err)
        })
    }
  )
})

module.exports = router
