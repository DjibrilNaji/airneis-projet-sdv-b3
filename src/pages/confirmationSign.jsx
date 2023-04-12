import routes from "@/web/routes"
import Link from "next/link"
import axios from "axios"
import config from "@/web/config"

export const getServerSideProps = async ({ query, req: { url} }) => {
  const token = query.token
  const queryUrl = Object.fromEntries(
    new URL(`http://example.com/${url}`).searchParams.entries()
  )

  const { data } = await axios.patch(
    `${config.api.baseURL}${routes.api.users.validate(token, queryUrl)}`
  )

  return {
    props: {
      user: data,
    },
  }
}

const ConfirmationSign = () => {
  return (
    <>
      <div className="w-full mx-auto">
        <h1 className="font-semibold text-2xl text-center uppercase">
          Welcome to Airnes
        </h1>
        <div className="mt-10 text-xl text-center mx-5">
          <p className="text-xl text-center mb-5">
            Your account is validated, you can now log in and access your
            personal data and order our best products. Thank you !
          </p>
          <p>
            Click{" "}
            <Link
              href={routes.signIn()}
              className="underline hover:text-blue-500"
            >
              here
            </Link>{" "}
            to go to the login page
          </p>
        </div>
      </div>
    </>
  )
}

ConfirmationSign.isPublic = true

export default ConfirmationSign
