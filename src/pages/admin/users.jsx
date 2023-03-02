import LayoutAdmin from "@/web/components/LayoutAdmin/LayoutAdmin"

const UsersAdmin = () => {
  return <h1>Users</h1>
}

UsersAdmin.getLayout = function (page) {
  return <LayoutAdmin>{page}</LayoutAdmin>
}

export default UsersAdmin
