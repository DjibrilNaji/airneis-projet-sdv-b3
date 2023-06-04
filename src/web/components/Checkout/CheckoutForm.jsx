import React, { useEffect, useState } from "react"
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"
import routes from "@/web/routes"
import styles from "@/styles/CheckoutForm.module.css"
import useAppContext from "@/web/hooks/useAppContext"
import useCartContext from "@/web/hooks/cartContext"

export default function CheckoutForm(props) {
  const { numberOrder, userId, addressId } = props

  const stripe = useStripe()
  const elements = useElements()

  const [message, setMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const {
    actions: { addNewOrder, getOrderDetail, addRelOrderProduct },
  } = useAppContext()

  const {
    state: { subtotal, tva, total, productsIdQuantities },
  } = useCartContext()

  useEffect(() => {
    if (!stripe) {
      return
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    )

    if (!clientSecret) {
      return
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage(`Payment succeeded !`)

          break

        case "processing":
          setMessage("Your payment is processing.")

          break

        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.")

          break

        default:
          setMessage("Something went wrong.")

          break
      }
    })
  }, [stripe])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsLoading(true)

    await addNewOrder(numberOrder, {
      userId,
      addressId,
      price: subtotal,
      amount_tva: tva,
      total_price: total,
    })

    const [, data] = await getOrderDetail(numberOrder)

    productsIdQuantities.forEach(async (item) => {
      await addRelOrderProduct({
        orderId: data.result.order[0].id,
        productId: item.id,
        quantity: item.quantity,
      })
    })

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `http://localhost:3000${routes.checkout.confirmation()}`,
      },
    })

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message)
    } else {
      setMessage("An unexpected error occurred.")
    }

    setIsLoading(false)
  }

  const paymentElementOptions = {
    layout: "tabs",
  }

  return (
    <div className="fixed inset-0">
      <div className="flex items-center justify-center min-h-screen">
        <form
          className={styles.form}
          style={{ minWidth: "300px" }}
          onSubmit={handleSubmit}
        >
          <h1 className="flex justify-center font-bold text-3xl mb-6">
            Paiement
          </h1>
          <PaymentElement
            className={styles.paymentElement}
            options={paymentElementOptions}
          />
          <button
            className={styles.button}
            disabled={isLoading || !stripe || !elements}
            id="submit"
          >
            <span>
              {isLoading ? <div className={styles.spinner}></div> : "Pay now"}
            </span>
          </button>
          {message && <div className={styles.paymentMessage}>{message}</div>}
        </form>
      </div>
    </div>
  )
}
