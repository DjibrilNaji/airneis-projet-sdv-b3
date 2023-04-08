import axios from "axios"
import routes from "@/web/routes"
import cookie from "cookie"
import { useCallback, useState } from "react"
import AddressForm from "@/web/components/Auth/AddressForm"

export const getServerSideProps = async ({ params, req, req: { url } }) => {
  const addressId = params.addressId
  const { token } = cookie.parse(
    req ? req.headers.cookie || "" : document.cookie
  )
  const query = Object.fromEntries(
    new URL(`http://example.com/${url}`).searchParams.entries()
  )

  const { data } = await axios.get(
    `http://localhost:3000/api${routes.api.users.singleAddress(
      addressId,
      query
    )}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )

  return {
    props: {
      address: data,
      addressId: addressId,
      token: token,
    },
  }
}

const EditAddress = (props) => {
  const {
    address: { result },
    addressId,
    token,
  } = props

  const [address, setAddress] = useState(result)

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
      const {
        data: { result },
      } = await axios.patch(
        `http://localhost:3000/api${routes.api.users.singleAddress(addressId)}`,
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

      setAddress(result)
    },
    [token, addressId]
  )

  return (
    <>
      <div className="w-full mx-auto">
        <h1 className="font-semibold text-2xl mb-10 text-center uppercase">
          My Address
        </h1>
        <div className="flex flex-wrap justify-center">
          <AddressForm initialValues={address} onSubmit={handleSubmit} />
        </div>
      </div>
    </>
  )
}

export default EditAddress
