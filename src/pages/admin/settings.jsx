import LayoutAdmin from "@/components/Admin/LayoutAdmin/LayoutAdmin"

const SettingsAdmin = () => {
  return <h1>Settings</h1>
}

SettingsAdmin.getLayout = function (page) {
  return <LayoutAdmin>{page}</LayoutAdmin>
}

export default SettingsAdmin
