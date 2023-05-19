import { useCallback, useEffect, useState } from "react"
import AddressForm from "@/web/components/Auth/AddressForm"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import useAppContext from "@/web/hooks/useAppContext"
import FormError from "@/web/components/FormError"

export const getServerSideProps = async ({ locale, params }) => {
  const addressId = params.addressId

  return {
    props: {
      addressId: addressId,
      ...(await serverSideTranslations(locale, ["common", "navigation"])),
    },
  }
}

const EditAddress = (props) => {
  const { addressId } = props

  const {
    actions: { getSingleAddress, modifyAddress },
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
              userId={userId}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default EditAddress
