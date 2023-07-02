import routes from "@/web/routes"
import { useCallback, useState } from "react"
import AddressForm from "@/web/components/Auth/AddressForm"
import { useRouter } from "next/router"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import useAppContext from "@/web/hooks/useAppContext"
import FormError from "@/web/components/Form/FormError"

export const getServerSideProps = async ({ locale, params }) => {
  const userId = params.userId

  return {
    props: {
      userId: userId,
      ...(await serverSideTranslations(locale, ["common", "navigation"])),
    },
  }
}

const AddAddress = (props) => {
  const { userId } = props
  const router = useRouter()
  const {
    actions: { addNewAddress },
  } = useAppContext()

  const handleSubmit = useCallback(
    async (values) => {
      const [err] = await addNewAddress(userId, values)

      if (err) {
        setError(err)

        return
      }

      router.push(routes.users.single(userId))
    },
    [addNewAddress, router, userId]
  )

  const [error, setError] = useState(null)

  return (
    <>
      {error ? <FormError error={error} /> : ""}
      <div className="w-full mx-auto">
        <h1 className="font-semibold text-2xl mb-10 text-center uppercase">
          My Address
        </h1>
        <div className="flex flex-wrap justify-center">
          <AddressForm onSubmit={handleSubmit} userId={userId} />
        </div>
      </div>
    </>
  )
}

export default AddAddress
