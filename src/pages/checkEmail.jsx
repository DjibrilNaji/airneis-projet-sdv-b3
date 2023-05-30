import useAppContext from "@/web/hooks/useAppContext.jsx"
import { useCallback, useState } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import CheckEmailForm from "@/web/components/Auth/CheckEmailForm"

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "navigation"])),
    },
  }
}

const CheckAccount = () => {
  const {
    actions: { checkEmail },
  } = useAppContext()
  const [error, setError] = useState(null)
  const handleSubmit = useCallback(
    async (values) => {
      const [err] = await checkEmail(values)

      if (err) {
        setError(err)

        return
      }
    },
    [checkEmail]
  )

  return (
    <>
      <div className="w-80 mx-auto">
        <div>
          <h1 className="font-semibold text-2xl text-center uppercase">
            Saisissez votre Email
          </h1>

          <CheckEmailForm onSubmit={handleSubmit} error={error} />
        </div>
      </div>
    </>
  )
}

CheckAccount.isPublic = true

export default CheckAccount
