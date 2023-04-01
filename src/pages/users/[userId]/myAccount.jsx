import UserForm from "@/web/components/Auth/UserForm"
import axios from "axios"
import routes from "@/web/routes"
import cookie from "cookie"
import { useCallback, useState } from "react"
import TableAddress from "@/web/components/Auth/TableAddress"

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

  const addressUser = await axios.get(
    `http://localhost:3000/api${routes.api.users.address(userId, query)}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )

  return {
    props: {
      user: data,
      userId: userId,
      token: token,
      allAddressUser: addressUser.data.result,
    },
  }
}

const MyAccount = (props) => {
  const {
    user: { result },
    userId,
    token,
    allAddressUser,
  } = props

  const [user, setUser] = useState(result)
  const [seeData, setSeeData] = useState("users")
  const optionUser = ["users", "address"]

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

  const handleChange = (event) => {
    setSeeData(event.target.value)
  }

  return (
    <>
      <div className="w-full mx-auto">
        <h1 className="font-semibold text-2xl text-center uppercase">
          My Account
        </h1>
        <div className="flex flex-wrap justify-center">
          <div hidden={seeData === "users" ? false : true}>
            <UserForm initialValues={user} onSubmit={handleSubmit} />
          </div>
          <div hidden={seeData === "address" ? false : true}>
            <TableAddress address={allAddressUser}></TableAddress>
          </div>
          <select
            name="typeData"
            className="top-0 h-full border-2 border-solid rounded-lg text-xl px-4 border-black mt-4 ml-10"
            onChange={handleChange}
          >
            {optionUser.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  )
}

export default MyAccount
