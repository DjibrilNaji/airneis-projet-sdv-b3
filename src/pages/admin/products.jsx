import LayoutAdmin from "@/components/Admin/LayoutAdmin/LayoutAdmin"

const ProductsAdmin = () => {
  return <h1>Products</h1>
}

ProductsAdmin.getLayout = function (page) {
  return <LayoutAdmin>{page}</LayoutAdmin>
}

export default ProductsAdmin
