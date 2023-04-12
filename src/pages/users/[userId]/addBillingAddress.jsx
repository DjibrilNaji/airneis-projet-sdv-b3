import axios from "axios"
import routes from "@/web/routes"
import cookie from "cookie"
import { useCallback } from "react"
import { useRouter } from "next/router"
import BillingAddressForm from "@/web/components/Auth/BillingAddressForm"

export const getServerSideProps = async ({ params, req }) => {
  const userId = params.userId

  const { token } = cookie.parse(
    req ? req.headers.cookie || "" : document.cookie
  )

  return {
    props: {
      userId: userId,
      token: token,
    },
  }
}

const AddBillingAddress = (props) => {
  const { userId, token } = props
  const router = useRouter()

  const handleSubmit = useCallback(
    async ({
      addressFull,
      country,
      city,
      cp,
      phoneNumber,
    }) => {
      await axios.post(
        `http://localhost:3000/api${routes.api.users.billingAddress.add(userId)}`,
        {
          addressFull,
          country,
          city,
          cp,
          phoneNumber,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      router.push(routes.users.single(userId))
    },
    [router, token, userId]
  )

  return (
    <>
      <div className="w-full mx-auto">
        <h1 className="font-semibold text-2xl mb-10 text-center uppercase">
          My Billing Address
        </h1>
        <div className="flex flex-wrap justify-center">
          <BillingAddressForm onSubmit={handleSubmit}/>
        </div>
      </div>
    </>
  )
}

export default AddBillingAddress
