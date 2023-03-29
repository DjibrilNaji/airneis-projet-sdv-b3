import UserForm from "@/web/components/Auth/UserForm"
import axios from "axios"
import routes from "@/web/routes"
import cookie from "cookie"
import { useCallback, useState } from "react"

export const getServerSideProps = async ({ params, req, req: { url } }) => {
  const userId = params.userId
  const { token } = cookie.parse(
    req ? req.headers.cookie || "" : document.cookie
  )
  const query = Object.fromEntries(
    new URL(`http://example.com/${url}`).searchParams.entries()
  )

  const { data } = await axios.get(
    `http://localhost:3000/api${routes.api.users.single(userId, query)}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )

  return {
    props: {
      user: data,
      userId: userId,
      token: token,
    },
  }
}

const MyAccount = (props) => {
  const {
    user: { result },
    userId,
    token,
  } = props

  const [user, setUser] = useState(result)

  const handleSubmit = useCallback(
    async ({ firstName, lastName, email, userName }) => {
      const {
        data: { result },
      } = await axios.patch(
        `http://localhost:3000/api${routes.api.users.update(userId)}`,
        {
          firstName,
          lastName,
          email,
          userName,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )

      setUser(result)
    },
    [token, userId]
  )

  return (
    <>
      <div className="w-80 mx-auto">
        <h1 className="font-semibold text-2xl text-center uppercase">
          My Account
        </h1>
        <UserForm initialValues={user} onSubmit={handleSubmit} />
      </div>
    </>
  )
}

export default MyAccount
