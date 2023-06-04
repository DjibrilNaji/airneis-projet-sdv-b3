import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import cookie from "cookie"
import { loadStripe } from "@stripe/stripe-js"
import useCartContext from "@/web/hooks/cartContext"
import { useEffect, useState } from "react"
import CheckoutForm from "@/web/components/Checkout/CheckoutForm"
import { Elements } from "@stripe/react-stripe-js"
import config from "@/web/config"
import routes from "@/web/routes"
import axios from "axios"

export const getServerSideProps = async ({ req, locale }) => {
  const cookies = req.headers.cookie
    ? cookie.parse(req.headers.cookie || "")
    : null

  const jwt = cookies ? (cookies.jwt !== undefined ? cookies.jwt : null) : null

  const userId = cookies
    ? cookies.userId !== undefined
      ? cookies.userId
      : null
    : null

  const addressId = cookies
    ? cookies.addressId !== undefined
      ? cookies.addressId
      : null
    : null

  const redirection = () => {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  if (jwt === undefined) {
    return redirection()
  }

  return {
    props: {
      jwt,
      userId,
      addressId,
      ...(await serverSideTranslations(locale, [
        "navigation",
        "cart",
        "delivery",
        "address",
      ])),
    },
  }
}

const stripePromise = loadStripe(
  "pk_test_51MjQJFGci79RaC26CuZNM82rmkZjrFgiFYxD5Kvrczh42zTRN2xNZyVte2hj29cFzkfJiSlpJZ7onTRRPIPI121I00wYmcfLWl"
)

const Payment = (props) => {
  const { userId, addressId } = props
  const {
    state: { totalStripe },
  } = useCartContext()

  const [clientSecret, setClientSecret] = useState("")
  const [numberOrder, setNumberOrder] = useState("")

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const response = await axios.post(
          `${config.api.baseApiURL}${routes.api.checkout.payment()}`,
          {
            amount: totalStripe,
            body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
          }
        )

        setClientSecret(response.data.clientSecret)
        setNumberOrder(response.data.clientId)
      } catch (error) {
        // Handle error
      }
    }

    const delay = setTimeout(fetchClientSecret, 100)

    return () => clearTimeout(delay)
  }, [totalStripe])

  const appearance = {
    theme: "stripe",
  }

  const options = {
    clientSecret,
    appearance,
  }

  return (
    <>
      <div className="flex">
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm
              numberOrder={numberOrder}
              userId={userId}
              addressId={addressId}
            />
          </Elements>
        )}
      </div>
    </>
  )
}

export default Payment
