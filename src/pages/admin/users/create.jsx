import UserForm from "@/web/components/Admin/Form/UserForm"
import BackButton from "@/web/components/BackButton"
import FormError from "@/web/components/FormError"
import useAppContext from "@/web/hooks/useAppContext"
import routes from "@/web/routes"
import { useRouter } from "next/router"
import { useCallback, useState } from "react"

const CreateUser = () => {
  const router = useRouter()
  const {
    actions: { addUser },
  } = useAppContext()
  const [error, setError] = useState("")

  const handleSubmit = useCallback(
    async (values) => {
      const [err] = await addUser(values)

      if (err) {
        setError(err)

        return
      }

      router.push(routes.admin.users.collection())
    },
    [router, addUser]
  )

  return (
    <>
      {error ? <FormError error={error} /> : ""}
      <div className="w-full mx-auto">
        <BackButton />
        <h1 className="font-semibold text-2xl mb-10 text-center uppercase">
          Add user
        </h1>

        <div className="flex flex-wrap justify-center">
          <UserForm onSubmit={handleSubmit} />
        </div>
      </div>
    </>
  )
}

export default CreateUser
