import { useCallback, useState } from "react"
import AddressForm from "@/web/components/Auth/AddressForm"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import useAppContext from "@/web/hooks/useAppContext"
import FormError from "@/web/components/Form/FormError"
import cookie from "cookie"
import getSingleAddressService from "@/web/services/address/getSingleAddress"
import createAPIClient from "@/web/createAPIClient"

export const getServerSideProps = async ({ locale, params, req }) => {
  const addressId = params.addressId
  const { jwt } = cookie.parse(req ? req.headers.cookie || "" : document.cookie)

  const api = createAPIClient({ jwt, server: true })
  const getSingleAddress = getSingleAddressService({ api })

  const [err, data] = await getSingleAddress(addressId)

  if (err) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

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
