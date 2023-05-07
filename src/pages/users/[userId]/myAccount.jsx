import UserForm from "@/web/components/Auth/UserForm"
import axios from "axios"
import routes from "@/web/routes"
import cookie from "cookie"
import { useCallback, useState } from "react"
import TableAddress from "@/web/components/Auth/TableAddress"
import config from "@/web/config"
import Link from "@/web/components/Link"
import Button from "@/web/components/Button"
import BillingAddressForm from "@/web/components/Auth/BillingAddressForm"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

export const getServerSideProps = async ({
  locale,
  params,
  req,
  req: { url },
}) => {
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
      ...(await serverSideTranslations(locale, ["common"])),
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
  const [billingAddress, setBillingAddress] = useState(result.billingAddress[0])
  const [seeData, setSeeData] = useState("Personnal Data")
  const optionUser = ["Personnal Data", "Address", "Billing Address"]
  const [allAddress, setAllAddress] = useState(allAddressUser)

  const handleSubmit = useCallback(
    async ({ firstName, lastName, email, userName }) => {
      const {
        data: { result },
      } = await axios.patch(
        `${config.api.baseApiURL}${routes.api.users.update(userId)}`,
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

  const handleSubmitBilling = useCallback(
    async ({ addressFull, country, city, cp, phoneNumber }) => {
      const {
        data: { result },
      } = await axios.patch(
        `${config.api.baseApiURL}${routes.api.users.billingAddress.update(
          user.billingAddress[0].id
        )}`,
        {
          addressFull,
          country,
          city,
          cp,
          phoneNumber,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )

      setBillingAddress(result)
    },
    [token, user.billingAddress]
  )

  const handleDeleteAddress = useCallback(
    async (event) => {
      const {
        data: { result },
      } = await axios.delete(
        `${config.api.baseApiURL}${routes.api.users.address.single(
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
          <div hidden={seeData === "Personnal Data" ? false : true}>
            <UserForm initialValues={user} onSubmit={handleSubmit} />
          </div>
          <div hidden={seeData === "Address" ? false : true}>
            <TableAddress
              address={allAddress}
              onClick={handleDeleteAddress}
            ></TableAddress>
            <Link href={routes.users.addAddress(userId)}>
              <Button className="my-5">Add address delivery</Button>
            </Link>
          </div>
          <div
            hidden={seeData === "Billing Address" ? false : true}
            className="mt-5"
          >
            <BillingAddressForm
              initialValues={billingAddress}
              onSubmit={handleSubmitBilling}
              hidden={!billingAddress ? true : false}
            />
            <Link
              href={routes.users.addBillingAddress(user.id)}
              hidden={!billingAddress ? false : true}
            >
              <Button>Add Billing Address</Button>
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
