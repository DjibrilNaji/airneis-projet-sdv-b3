import useAppContext from "@/web/hooks/useAppContext.jsx"
import { useCallback, useState } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import ResetPasswordForm from "@/web/components/Auth/ResetPasswordForm"
import { useRouter } from "next/router"
import routes from "@/web/routes"

export async function getServerSideProps({ locale, query }) {
    const token = query.token

  return {
    props: {
        token: token,
      ...(await serverSideTranslations(locale, ["common", "navigation"])),
    },
  }
}

const ResetPassword = (props) => {
    const {token} = props
  const {
    actions: { resetPassword },
  } = useAppContext()
  const router = useRouter()
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const handleSubmit = useCallback(
    async (values) => {
      const [err] = await resetPassword(token, values)

      if (err) {
        setError(err)

        return
      }

      setSuccess("Reset Password success")
      setTimeout(() => {
        router.push(routes.signIn())
      }, 5000)
    },
    [resetPassword, router, token]
  )

  return (
    <>
      <div className="w-80 mx-auto">
        <div>
          <h1 className="font-semibold text-2xl text-center uppercase">
            Reset Password
          </h1>

          <ResetPasswordForm onSubmit={handleSubmit} error={error} success={success} />
        </div>
      </div>
    </>
  )
}

ResetPassword.isPublic = true

export default ResetPassword
