const AWS = require("aws-sdk")
const { config } = require("dotenv")

config()

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID_S3,
  secretAccessKey: process.env.SECRET_ACCESS_KEY_S3,
  region: "eu-central-1",
  signatureVersion: "v4",
})

const s3 = new AWS.S3()

module.exports = s3
