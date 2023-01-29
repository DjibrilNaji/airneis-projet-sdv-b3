const express = require("express")
const MongoClient = require("mongodb").MongoClient

const router = express.Router()

// Products
router.get("/products", (req, res) => {
    MongoClient.connect(process.env.MONGODB_URL, {useNewUrlParser: true}, (err, client) => {
        if (err) {
            throw err
        }

        const db = client.db(process.env.DB_NAME)
        const products = db.collection("products")

        products
            .find({})
            .toArray((err, result) => {
                if (err) {
                    throw err
                }

                res.json(result)
                client.close()
            })
    })
})

// Users
router.post("/users/add", (req, res) => {
    MongoClient.connect(process.env.MONGODB_URL, {useNewUrlParser: true}, (err, client) => {
        if (err) {
            throw err
        }

        const db = client.db(process.env.DB_NAME)
        const products = db.collection("users")

        products
            .insertOne(req.body)
            .then(() => res.status(200)
                .send("successfully inserted new document"))
            .catch((err) => {
                res.send(err)
            })
    })
})

module.exports = router
