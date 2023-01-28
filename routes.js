const express = require("express")
const MongoClient = require("mongodb").MongoClient

const router = express.Router()

router.get("/products", (req, res) => {
    MongoClient.connect("mongodb+srv://Djibril:Admin123@cluster-marketplace.ecqgaul.mongodb.net/?retryWrites=true&w=majority", {useNewUrlParser: true}, (err, client) => {
        if (err) {
            throw err
        }
        
        const db = client.db("marketplace")
        db.collection("products").find({}).toArray((err, result) => {
            if (err) {
                throw err
            }

            res.json(result)
            client.close()
        })
    })
})

module.exports = router
