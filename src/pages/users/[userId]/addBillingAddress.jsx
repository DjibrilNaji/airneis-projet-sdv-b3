import routes from "@/web/routes"
import { useCallback, useState } from "react"
import { useRouter } from "next/router"
import BillingAddressForm from "@/web/components/Auth/BillingAddressForm"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import useAppContext from "@/web/hooks/useAppContext"
import FormError from "@/web/components/FormError"

export const getServerSideProps = async ({ locale, params }) => {
  const userId = params.userId

  return {
    props: {
      userId: userId,
      ...(await serverSideTranslations(locale, ["common", "navigation"])),
    },
  }
}

const AddBillingAddress = (props) => {
  const { userId } = props
  const router = useRouter()
  const {
    actions: { addNewBillingAddress },
  } = useAppContext()

  const handleSubmit = useCallback(
    async (values) => {
      const [err] = await addNewBillingAddress(userId, values)

      if (err) {
        setError(err)

        return
      }

      router.push(routes.users.single(userId))
    },
    [addNewBillingAddress, router, userId]
  )

  const [error, setError] = useState(null)

  return (
    <>
      {error ? <FormError error={error} /> : ""}
      <div className="w-full mx-auto">
        <h1 className="font-semibold text-2xl mb-10 text-center uppercase">
          My Billing Address
        </h1>
        <div className="flex flex-wrap justify-center">
          <BillingAddressForm onSubmit={handleSubmit} />
        </div>
      </div>
    </>
  )
}

export default AddBillingAddress
