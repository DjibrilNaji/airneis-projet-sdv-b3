import LoginForm from "@/web/components/Auth/LoginForm"
import useAppContext from "@/web/hooks/useAppContext.jsx"
import { useRouter } from "next/router.js"
import { useCallback, useState } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Form from "@/web/components/Form"
import routes from "@/web/routes"

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "navigation"])),
    },
  }
}

const Login = () => {
  const router = useRouter()
  const {
    actions: { signIn },
  } = useAppContext()
  const [error, setError] = useState(null)
  const handleSubmit = useCallback(
    async (values) => {
      setError(null)

      const [err] = await signIn(values)

      if (err) {
        setError(err)

        return
      }

      router.push(routes.home())
    },
    [signIn, router]
  )

  return (
    <Form title="Connection">
      <LoginForm onSubmit={handleSubmit} error={error} />
    </Form>
  )
}

Login.isPublic = true

export default Login
