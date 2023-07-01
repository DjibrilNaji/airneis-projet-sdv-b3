import RegisterForm from "@/web/components/Auth/RegisterForm"
import useAppContext from "@/web/hooks/useAppContext"
import { useRouter } from "next/router.js"
import { useCallback, useState } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Form from "@/web/components/Form/Form"
import routes from "@/web/routes"

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "navigation"])),
    },
  }
}

const Register = () => {
  const router = useRouter()
  const {
    actions: { signUp },
  } = useAppContext()
  const [error, setError] = useState(null)
  const handleSubmit = useCallback(
    async (values) => {
      const [err] = await signUp(values)

      if (err) {
        setError(err)

        return
      }

      router.push(routes.signIn())
    },
    [signUp, router]
  )

  return (
    <Form title="Register">
      <RegisterForm onSubmit={handleSubmit} error={error} />
    </Form>
  )
}

Register.isPublic = true

export default Register
