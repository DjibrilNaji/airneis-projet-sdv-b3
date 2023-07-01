import useAppContext from "@/web/hooks/useAppContext.jsx"
import { useCallback, useState } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import CheckEmailForm from "@/web/components/Auth/CheckEmailForm"
import Form from "@/web/components/Form/Form"

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
  const [success, setSuccess] = useState(null)
  const handleSubmit = useCallback(
    async (values) => {
      const [err] = await checkEmail(values)

      if (err) {
        err[0] = "check your mail !"
        setError(err)
        setTimeout(() => {
          setError(null)
        }, 5000)

        return
      }

      setSuccess("check you mail !")
      setTimeout(() => {
        setSuccess(null)
      }, 5000)
    },
    [checkEmail]
  )

  return (
    <Form title="Saisissez votre Email">
      <CheckEmailForm
        onSubmit={handleSubmit}
        success={error ? error : success}
      />
    </Form>
  )
}

CheckAccount.isPublic = true

export default CheckAccount
