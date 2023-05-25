import { useCallback, useState } from "react"
import AddressForm from "@/web/components/Auth/AddressForm"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import useAppContext from "@/web/hooks/useAppContext"
import FormError from "@/web/components/FormError"
import axios from "axios"
import cookie from "cookie"
import config from "@/web/config"
import routes from "@/web/routes"

export const getServerSideProps = async ({ locale, params, req }) => {
  const addressId = params.addressId
  const { token } = cookie.parse(
    req ? req.headers.cookie || "" : document.cookie
  )

  const { data } = await axios.get(
    `${config.api.baseURL}${routes.api.users.address.single(addressId)}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )

  return {
    props: {
      address: data,
      addressId: addressId,
      ...(await serverSideTranslations(locale, ["common", "navigation"])),
    },
  }
}

const EditAddress = (props) => {
  const {
    address: { result },
    addressId,
  } = props

  const {
    actions: { modifyAddress },
  } = useAppContext()

  const [address, setAddress] = useState(result)
  const [error, setError] = useState(null)

  const handleSubmit = useCallback(
    async (values) => {
      const [err, data] = await modifyAddress(addressId, values)

      if (err) {
        setError(err)

        return
      }

      setAddress(data.result)
    },
    [modifyAddress, addressId]
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
              userId={address.userId}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default EditAddress
