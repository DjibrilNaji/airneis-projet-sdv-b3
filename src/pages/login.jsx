import LoginForm from "@/web/components/Auth/LoginForm"
import useAppContext from "@/web/hooks/useAppContext.jsx"
import { useRouter } from "next/router.js"
import { useCallback, useState, useEffect } from "react"
import Loader from "@/web/components/LoadingSpinner"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
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

      router.push("/")
    },
    [signIn, router]
  )

  const [isLoading, setIsLoading] = useState(true)
  const publicState = Login.isPublic

  useEffect(() => {
    if (publicState === true) {
      setTimeout(() => {
        setIsLoading(false)
      }, 3000)
    }
  })

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <div className="w-80 mx-auto">
        <div>
          <h1 className="font-semibold text-2xl text-center uppercase">
            Connexion
          </h1>

          <LoginForm onSubmit={handleSubmit} error={error} />
        </div>
      </div>
    </>
  )
}

Login.isPublic = true

export default Login
