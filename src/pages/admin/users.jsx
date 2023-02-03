import LayoutAdmin from "@/components/Admin/LayoutAdmin/LayoutAdmin"

const UsersAdmin = () => {
  return <h1>Users</h1>
}

UsersAdmin.getLayout = function (page) {
  return <LayoutAdmin>{page}</LayoutAdmin>
}

export default UsersAdmin
