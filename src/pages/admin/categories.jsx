import LayoutAdmin from "@/components/Admin/LayoutAdmin/LayoutAdmin"

const CategoriesAdmin = () => {
  return <h1>Categories</h1>
}

CategoriesAdmin.getLayout = function (page) {
  return <LayoutAdmin>{page}</LayoutAdmin>
}

export default CategoriesAdmin