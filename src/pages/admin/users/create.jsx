import UserForm from "@/web/components/Admin/Form/UserForm"
import BackButton from "@/web/components/BackButton"
import config from "@/web/config"
import routes from "@/web/routes"
import axios from "axios"
import { useRouter } from "next/router"
import { useCallback } from "react"

const CreateUser = () => {
  const router = useRouter()

  const handleSubmit = useCallback(
    async ({ firstName, email, lastName, userName, password }) => {
      await axios.post(
        `${config.api.baseApiURL}${routes.api.admin.users.create()}`,
        {
          firstName,
          lastName,
          email,
          userName,
          password,
        }
      )

      router.push(routes.admin.users.collection())
    },
    [router]
  )

  return (
    <>
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
