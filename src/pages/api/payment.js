import validate from "@/api/middlewares/validate"
import mw from "@/api/mw.js"
import { numberValidator } from "@/validators"

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)

const handler = mw({
  POST: [
    validate({
      body: {
        amount: numberValidator.required(),
      },
    }),
    async ({
      locals: {
        body: { amount },
      },
      res,
    }) => {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "eur",
        payment_method_types: ["card"],
      })

      res.send({
        clientSecret: paymentIntent.client_secret,
        clientId: paymentIntent.id.slice(3),
      })
    },
  ],
})

export default handler
