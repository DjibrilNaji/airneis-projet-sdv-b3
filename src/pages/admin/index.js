import DashboardAdmin from "@/components/Admin/DashboardAdmin"
import LayoutAdmin from "@/components/Admin/LayoutBack/LayoutAdmin"

const IndexAdmin = () => {
  return <DashboardAdmin />
}

IndexAdmin.getLayout = function (page) {
  return <LayoutAdmin>{page}</LayoutAdmin>
}

export default IndexAdmin
