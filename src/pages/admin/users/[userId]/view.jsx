import LayoutAdmin from "@/web/components/Admin/LayoutAdmin/LayoutAdmin"
import config from "@/web/config"
import routes from "@/web/routes"
import axios from "axios"

export const getServerSideProps = async ({ params, req: { url } }) => {
  const userId = params.userId
  const query = Object.fromEntries(
    new URL(`http://example.com/${url}`).searchParams.entries()
  )

  const { data } = await axios.get(
    `${config.api.baseURL}${routes.api.admin.users.single(userId, query)}`
  )

  return {
    props: {
      userInfo: data,
      userId,
    },
  }
}

const ViewUser = () => {}

ViewUser.getLayout = function (page) {
  return <LayoutAdmin>{page}</LayoutAdmin>
}

export default ViewUser
