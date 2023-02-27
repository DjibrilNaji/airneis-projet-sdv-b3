import DashboardAdmin from "@/web/components/LayoutAdmin/DashboardAdmin"
import LayoutAdmin from "@/web/components/LayoutAdmin/LayoutAdmin"

const IndexAdmin = () => {
  return <DashboardAdmin />
}

IndexAdmin.getLayout = function (page) {
  return <LayoutAdmin>{page}</LayoutAdmin>
}

export default IndexAdmin
