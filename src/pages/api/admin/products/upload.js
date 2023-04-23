import multer from "multer"
import s3 from "@@/configAWS"
import mw from "@/api/mw"

export const config = {
  api: {
    bodyParser: false,
  },
}

const upload = multer({
  storage: multer.memoryStorage(),
}).single("file")

const handler = mw({
  POST: [
    async ({ req, res }) => {
      try {
        upload(req, res, async function (err) {
          if (err) {
            res.status(400).json({ message: "Bad request." })
          } else {
            const { originalname, buffer } = req.file

            const params = {
              Bucket: "airness-matd",
              Key: originalname,
              Body: buffer,
            }
            await s3.upload(params).promise()

            res.status(200).json({ message: "File uploaded successfully." })
          }
        })
      } catch (error) {
        res.status(500).json({ message: "Internal server error." })
      }
    },
  ],
})

export default handler
