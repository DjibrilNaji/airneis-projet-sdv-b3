import RegisterForm from "@/web/components/Auth/RegisterForm"
import useAppContext from "@/web/hooks/useAppContext"
import { useRouter } from "next/router.js"
import { useCallback, useState } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

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

      router.push("/login")
    },
    [signUp, router]
  )

  return (
    <>
      <div className="w-80 mx-auto">
        <h1 className="font-semibold text-2xl text-center uppercase">
          Inscription
        </h1>

        <RegisterForm onSubmit={handleSubmit} error={error} />
      </div>
    </>
  )
}

Register.isPublic = true

export default Register
