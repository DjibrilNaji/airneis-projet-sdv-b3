import DashboardAdmin from "@/web/components/Admin/LayoutAdmin/DashboardAdmin"
import LayoutAdmin from "@/web/components/Admin/LayoutAdmin/LayoutAdmin"
import cookie from "cookie"
import jsonwebtoken from "jsonwebtoken"
import config from "@/api/config"
import { AppContextProvider } from "@/web/hooks/useAppContext"

export const getServerSideProps = async ({ req }) => {
  const { jwt } = cookie.parse(req ? req.headers.cookie || "" : document.cookie)

  const redirection = () => {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  if (jwt === undefined) {
    return redirection()
  }

  const { payload } = jsonwebtoken.verify(jwt, config.security.jwt.secret)

  if (payload.user.isAdmin !== true) {
    return redirection()
  } else {
    return { props: {} }
  }
}

const IndexAdmin = () => {
  return <DashboardAdmin />
}

IndexAdmin.getLayout = function (page) {
  return (
    <AppContextProvider>
      <LayoutAdmin>{page}</LayoutAdmin>
    </AppContextProvider>
  )
}

export default IndexAdmin
