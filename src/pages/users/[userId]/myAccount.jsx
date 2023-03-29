import UserForm from "@/web/components/Auth/UserForm"
import axios from "axios"
import routes from "@/web/routes"
import cookie from "cookie"

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
    },
  }
}

const MyAccount = (props) => {
  const {
    user: { result },
  } = props

  return (
    <>
      <div className="w-80 mx-auto">
        <h1 className="font-semibold text-2xl text-center uppercase">
          My Account
        </h1>
        <UserForm initialValues={result} />
      </div>
    </>
  )
}

export default MyAccount
