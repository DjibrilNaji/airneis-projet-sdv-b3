import axios from "axios"
import routes from "@/web/routes"
import cookie from "cookie"
import { useCallback, useEffect, useState } from "react"
import AddressForm from "@/web/components/Auth/AddressForm"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import useAppContext from "@/web/hooks/useAppContext"
import FormError from "@/web/components/FormError"

export const getServerSideProps = async ({ locale, params, req }) => {
  const addressId = params.addressId
  const { token } = cookie.parse(
    req ? req.headers.cookie || "" : document.cookie
  )

  return {
    props: {
      addressId: addressId,
      token: token,
      ...(await serverSideTranslations(locale, ["common", "navigation"])),
    },
  }
}

const EditAddress = (props) => {
  const { addressId, token } = props

  const {
    actions: { getSingleAddress },
  } = useAppContext()

  useEffect(() => {
    const fetchData = async () => {
      const [err, data] = await getSingleAddress(addressId)

      if (err) {
        setError(err)

        return
      }

      setAddress(data.result)
      setUserId(data.result.userId)
    }
    fetchData()
  }, [addressId, getSingleAddress])

  const [address, setAddress] = useState()
  const [userId, setUserId] = useState()
  const [error, setError] = useState(null)

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
        `http://localhost:3000/api${routes.api.users.address.single(
          addressId
        )}`,
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
      {error ? (
        <FormError error={error} />
      ) : (
        <div className="w-full mx-auto">
          <h1 className="font-semibold text-2xl mb-10 text-center uppercase">
            My Address
          </h1>
          <div className="flex flex-wrap justify-center">
            <AddressForm
              initialValues={address}
              onSubmit={handleSubmit}
              userId={userId}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default EditAddress
