import UserForm from "@/web/components/Auth/UserForm"
import routes from "@/web/routes"
import { useCallback, useState } from "react"
import TableAddress from "@/web/components/Auth/TableAddress"
import Link from "@/web/components/Link"
import Button from "@/web/components/Button"
import BillingAddressForm from "@/web/components/Auth/BillingAddressForm"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import useAppContext from "@/web/hooks/useAppContext"
import FormError from "@/web/components/FormError"
import cookie from "cookie"
import getAllAddressService from "@/web/services/address/getAllAddress"
import getPersonnalDataService from "@/web/services/user/getPersonnalData"
import createAPIClient from "@/web/createAPIClient"

export const getServerSideProps = async ({ locale, params, req }) => {
  const userId = params.userId

  const redirection = () => {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  const { jwt } = cookie.parse(req ? req.headers.cookie || "" : document.cookie)
  const api = createAPIClient({ jwt, server: true })
  const getAllAddress = getAllAddressService({ api })
  const getPersonnalData = getPersonnalDataService({ api })

  const [err, data] = await getPersonnalData(userId)

  if (err) {
    redirection()
  }

  const [error, dataAddress] = await getAllAddress(userId)

  if (error) {
    redirection()
  }

  if (err) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  return {
    props: {
      userId: userId,
      user: data,
      allAddressUser: dataAddress.result,
      ...(await serverSideTranslations(locale, ["common", "navigation"])),
    },
  }
}

const MyAccount = (props) => {
  const {
    user: { result },
    userId,
    allAddressUser,
  } = props

  const {
    actions: { deleteAddress, updatePersonnalData, updateBillingAddress },
  } = useAppContext()

  const [error, setError] = useState(null)
  const [user, setUser] = useState(result)
  const [billingAddress, setBillingAddress] = useState(result.billingAddress[0])
  const [seeData, setSeeData] = useState("Personnal Data")
  const optionUser = ["Personnal Data", "Address", "Billing Address"]
  const [allAddress, setAllAddress] = useState(allAddressUser)

  const handleSubmit = useCallback(
    async (values) => {
      const [err, data] = await updatePersonnalData(userId, values)

      if (err) {
        setError(err)

        return
      }

      setUser(data.result)
    },
    [updatePersonnalData, userId]
  )

  const handleSubmitBilling = useCallback(
    async (values) => {
      const [err, data] = await updateBillingAddress(billingAddress.id, values)

      if (err) {
        setError(err)

        return
      }

      setBillingAddress(data.result)
    },
    [billingAddress, updateBillingAddress]
  )

  const handleDeleteAddress = useCallback(
    async (event) => {
      const [err, data] = await deleteAddress(
        parseInt(event.currentTarget.dataset.id)
      )

      if (err) {
        setError(err)

        return
      }

      setAllAddress(data.result)
    },
    [deleteAddress]
  )

  const handleChange = (event) => {
    setSeeData(event.target.value)
  }

  return (
    <>
      {error ? <FormError error={error} /> : ""}
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
              href={routes.users.addBillingAddress(userId)}
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
