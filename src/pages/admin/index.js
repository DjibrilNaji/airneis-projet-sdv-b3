import DashboardAdmin from "@/web/components/Admin/LayoutAdmin/DashboardAdmin"
import LayoutAdmin from "@/web/components/Admin/LayoutAdmin/LayoutAdmin"

const IndexAdmin = () => {
  return <DashboardAdmin />
}

IndexAdmin.getLayout = function (page) {
  return <LayoutAdmin>{page}</LayoutAdmin>
}

export default IndexAdmin
