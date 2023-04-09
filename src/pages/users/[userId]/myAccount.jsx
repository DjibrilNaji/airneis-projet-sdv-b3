import UserForm from "@/web/components/Auth/UserForm"
import axios from "axios"
import routes from "@/web/routes"
import cookie from "cookie"
import { useCallback, useState } from "react"
import TableAddress from "@/web/components/Auth/TableAddress"
import config from "@/web/config"
import Link from "next/link"
import Button from "@/web/components/Button"

export const getServerSideProps = async ({ params, req, req: { url } }) => {
  const userId = params.userId
  const { token } = cookie.parse(
    req ? req.headers.cookie || "" : document.cookie
  )
  const query = Object.fromEntries(
    new URL(`http://example.com/${url}`).searchParams.entries()
  )

  const { data } = await axios.get(
    `${config.api.baseURL}${routes.api.users.single(userId, query)}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )

  const addressUser = await axios.get(
    `${config.api.baseURL}${routes.api.users.address.collection(
      userId,
      query
    )}`,
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
  const [allAddress, setAllAddress] = useState(allAddressUser)

  const handleSubmit = useCallback(
    async ({ firstName, lastName, email, userName }) => {
      const {
        data: { result },
      } = await axios.patch(
        `${config.api.baseURL}${routes.api.users.update(userId)}`,
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

  const handleDeleteAddress = useCallback(
    async (event) => {
      const {
        data: { result },
      } = await axios.delete(
        `${config.api.baseApiURL}${routes.api.users.singleAddress(
          parseInt(event.currentTarget.dataset.id)
        )}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )

      setAllAddress(result)
    },
    [token]
  )

  const handleChange = (event) => {
    setSeeData(event.target.value)
  }

  return (
    <>
      <div className="w-full mx-auto">
        <h1 className="font-semibold text-2xl mb-10 text-center uppercase">
          My Account
        </h1>
        <div className="flex flex-wrap justify-center">
          <div hidden={seeData === "users" ? false : true}>
            <UserForm initialValues={user} onSubmit={handleSubmit} />
          </div>
          <div hidden={seeData === "address" ? false : true}>
            <TableAddress
              address={allAddress}
              onClick={handleDeleteAddress}
            ></TableAddress>
            <Link href={routes.users.addAddress(userId)}>
              <Button className="my-5">Add address delivery</Button>
            </Link>
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
