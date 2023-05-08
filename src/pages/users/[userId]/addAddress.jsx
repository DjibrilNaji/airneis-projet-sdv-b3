import axios from "axios"
import routes from "@/web/routes"
import cookie from "cookie"
import { useCallback } from "react"
import AddressForm from "@/web/components/Auth/AddressForm"
import { useRouter } from "next/router"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

export const getServerSideProps = async ({ locale, params, req }) => {
  const userId = params.userId

  const { token } = cookie.parse(
    req ? req.headers.cookie || "" : document.cookie
  )

  return {
    props: {
      userId: userId,
      token: token,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  }
}

const AddAddress = (props) => {
  const { userId, token } = props
  const router = useRouter()

  const handleSubmit = useCallback(
    async ({
      firstName,
      lastName,
      addressFull,
      addressOptional,
      country,
      city,
      cp,
      phoneNumber,
      address_default,
    }) => {
      await axios.post(
        `http://localhost:3000/api${routes.api.users.address.add(userId)}`,
        {
          firstName,
          lastName,
          addressFull,
          addressOptional,
          country,
          city,
          cp,
          phoneNumber,
          address_default,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      router.push(routes.users.single(userId))
    },
    [router, token, userId]
  )

  return (
    <>
      <div className="w-full mx-auto">
        <h1 className="font-semibold text-2xl mb-10 text-center uppercase">
          My Address
        </h1>
        <div className="flex flex-wrap justify-center">
          <AddressForm onSubmit={handleSubmit} userId={userId} />
        </div>
      </div>
    </>
  )
}

export default AddAddress
