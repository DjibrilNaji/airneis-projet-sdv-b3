import axios from "axios"
import routes from "@/web/routes"
import cookie from "cookie"
import { useCallback } from "react"
import AddressForm from "@/web/components/Auth/AddressForm"

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

const EditAddress = (props) => {
  const { userId, token } = props

  const handleSubmit = useCallback(
    async ({
      firstName,
      lastName,
      addressFull,
      addressOptional,
      country,
      city,
      cp,
      phoneNumber,
      address_default,
    }) => {
      await axios.post(
        `http://localhost:3000/api${routes.api.users.addAddress(userId)}`,
        {
          firstName,
          lastName,
          addressFull,
          addressOptional,
          country,
          city,
          cp,
          phoneNumber,
          address_default,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
    },
    [token, userId]
  )

  return (
    <>
      <div className="w-full mx-auto">
        <h1 className="font-semibold text-2xl mb-10 text-center uppercase">
          My Address
        </h1>
        <div className="flex flex-wrap justify-center">
          <AddressForm onSubmit={handleSubmit} />
        </div>
      </div>
    </>
  )
}

export default EditAddress
