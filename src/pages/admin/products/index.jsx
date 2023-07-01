import LayoutAdmin from "@/web/components/Admin/LayoutAdmin/LayoutAdmin"
import Link from "next/link"
import { useCallback, useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faEdit } from "@fortawesome/free-solid-svg-icons"
import routes from "@/web/routes"
import useAppContext, {
  AppContextProvider,
} from "@/web/hooks/useAppContext.jsx"
import FormError from "@/web/components/Form/FormError"
import { useRouter } from "next/router"
import Modal from "@/web/components/Modal"
import EditProductForm from "@/web/components/Admin/Form/EditProductForm"
import Image from "next/image"
import ContentPage from "@/web/components/Admin/ContentPage"
import ConfirmDelete from "@/web/components/Admin/ConfirmDelete"
import Dialog from "@/web/components/Dialog"

const ProductAdmin = () => {
  const {
    state: {
      currentPage,
      sortColumn,
      order,
      limit,
      selectedItems,
      toggleDeleteOne,
      itemIdToRemove,
    },
    actions: {
      getAllProducts,
      deleteProducts,
      getSingleProduct,
      getMaterials,
      updateProduct,
      setSelectedItems,
      setToggleDeleteOne,
    },
  } = useAppContext()

  const [data, setData] = useState([])
  const [totalPages, setTotalPages] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [error, setError] = useState(null)
  const [product, setProduct] = useState([])
  const [materials, setMaterials] = useState([])
  const [images, setImages] = useState([])
  const [toggleUpdateProduct, setToggleUpdateProduct] = useState(true)
  const [toggleDeleteSeveral, setToggleDeleteSeveral] = useState()
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenEditUser, setIsOpenEditUser] = useState(false)
  const [contentDialog, setContentDialog] = useState()

  const router = useRouter()

  const columnsTableHead = [
    {
      displayName: "Select",
      handleSort: false,
    },
    {
      displayName: "Id",
      fieldName: "id",
      handleSort: true,
    },
    {
      displayName: "Name",
      fieldName: "name",
      handleSort: true,
    },
    {
      displayName: "Category",
      handleSort: false,
    },
    {
      displayName: "Materials",
      handleSort: false,
    },
    {
      displayName: "Price",
      fieldName: "price",
      handleSort: true,
    },
    {
      displayName: "Stock",
      fieldName: "stock",
      handleSort: true,
    },
    {
      displayName: "Higlhander",
      handleSort: false,
    },
    {
      displayName: "Active",
      handleSort: false,
    },
    {
      displayName: "Delete",
      handleSort: false,
    },
    {
      displayName: "Actions",
      handleSort: false,
    },
  ]
  const types = {
    product: { name: "product", title: "Product informations" },
    images: { name: "images", title: "Images Product" },
  }

  const [selectedType, setSelectedType] = useState(types.product)
  const [viewProductInfo, setViewProductInfo] = useState(false)

  const fetchData = useCallback(
    async (page) => {
      const [err, data] = await getAllProducts(
        limit,
        page,
        sortColumn,
        order,
        searchTerm
      )

      if (err) {
        router.push(routes.home())

        return
      }

      const totalProducts = data.result.meta.count
      const totalPages = Math.ceil(totalProducts / limit)
      setTotalPages(totalPages)
      setData(data.result)
    },
    [getAllProducts, limit, sortColumn, order, searchTerm, router]
  )

  useEffect(() => {
    fetchData(currentPage)
  }, [currentPage, fetchData])

  const handleDelete = useCallback(
    async (productId) => {
      const [err] = await deleteProducts(productId)

      if (err) {
        setError(err)

        return
      }

      fetchData(currentPage)
      setSelectedItems([])
      setToggleDeleteOne(false)
      setToggleDeleteSeveral(false)
      setContentDialog("The product has been deleted")
      setIsOpen(true)
      setTimeout(() => setIsOpen(false), 3000)
    },
    [
      deleteProducts,
      fetchData,
      currentPage,
      setSelectedItems,
      setToggleDeleteOne,
    ]
  )

  const fetchSingleProduct = async (id) => {
    const [err, dataProduct] = await getSingleProduct(id)

    if (err) {
      setError(err)

      return
    }

    const [error, dataMaterials] = await getMaterials()

    if (error) {
      setError(error)

      return
    }

    setProduct(dataProduct.result.product[0])
    setMaterials(dataMaterials.result)
    setImages(dataProduct.result.product[0].image)
    setViewProductInfo(true)
  }

  const handleSubmitUpdate = useCallback(
    async (values) => {
      const [err, data] = await updateProduct(product.id, values)

      if (err) {
        setError(err)

        return
      }

      setProduct(data.result)
      setToggleUpdateProduct(!toggleUpdateProduct)
      setContentDialog("The product has been updated")
      setIsOpenEditUser(true)
      setTimeout(() => setIsOpenEditUser(false), 3000)
    },
    [product, toggleUpdateProduct, updateProduct]
  )

  return (
    <>
      {error ? <FormError error={error} /> : ""}

      <Dialog isOpen={isOpen} content={contentDialog} />

      <ConfirmDelete
        isOpen={toggleDeleteOne || toggleDeleteSeveral}
        page="users"
        close={
          toggleDeleteSeveral
            ? () => setToggleDeleteSeveral(false)
            : () => setToggleDeleteOne(false)
        }
        remove={
          toggleDeleteSeveral
            ? () => selectedItems.map((id) => handleDelete(id))
            : () => handleDelete(itemIdToRemove)
        }
      />

      <ContentPage
        title="Products"
        data={data.products}
        columnsTableHead={columnsTableHead}
        columnsTableBody={[
          "id",
          "name",
          "categoryName",
          "materialList",
          "price",
          "stock",
        ]}
        name={"products"}
        totalPages={totalPages}
        searchTerm={searchTerm}
        fetchSingleItem={fetchSingleProduct}
        onChange={(e) => setSearchTerm(e.target.value)}
        getInfo={true}
        displayHighlander={true}
        displayIsDelete={true}
        displayDeleteButton={true}
        select={true}
      />

      <div className="flex flex-col justify-start">
        <button
          className="border-2 rounded-lg mx-3 my-4 p-2 bg-red-500 text-white disabled:cursor-not-allowed disabled:bg-red-200 w-fit"
          onClick={() => selectedItems.map((id) => handleDelete(id))}
          disabled={selectedItems.length === 0}
        >
          Supprimer tous les éléments séléctionnés
        </button>
        <Link
          href={routes.admin.products.create()}
          className="border-2 rounded-lg mx-3 my-4 p-2 bg-blue-500 text-white w-fit"
        >
          Ajouter un Produit
        </Link>
      </div>

      <Modal
        isOpen={viewProductInfo}
        modalTitle={selectedType.title}
        closeModal={() => setViewProductInfo(false)}
      >
        <div className="flex gap-4">
          <button
            onClick={() => setSelectedType(types.product)}
            className={`flex ${
              selectedType.name === types.product.name && "font-bold underline"
            }`}
          >
            Product
          </button>
          <button
            onClick={() => setSelectedType(types.images)}
            className={`flex ${
              selectedType.name === types.images.name && "font-bold underline"
            }`}
          >
            Image Product
          </button>
        </div>

        {selectedType.name === types.product.name ? (
          <>
            <div className="border-t-4 border-gray-500 px-3 my-4" />
            <div className="flex items-center justify-between ">
              <div className="px-4">
                {product.isDelete ? (
                  <span className="italic text-red-500 text-lg">
                    (Product delete : id {product.id})
                  </span>
                ) : (
                  <span className="italic text-green-500 text-lg">
                    (Product active : id {product.id})
                  </span>
                )}
              </div>
              {!product.isDelete && (
                <button
                  className="flex justify-end text-stone-500 font-bold text-lg rounded"
                  onClick={() => setToggleUpdateProduct(!toggleUpdateProduct)}
                  title={
                    toggleUpdateProduct
                      ? "Update Product"
                      : "Finish modifications"
                  }
                >
                  <FontAwesomeIcon
                    icon={toggleUpdateProduct ? faEdit : faCheck}
                    className="h-7"
                  />
                </button>
              )}
            </div>
            <EditProductForm
              initialValues={product}
              onSubmit={handleSubmitUpdate}
              active={toggleUpdateProduct}
              material={materials}
            />

            <Dialog isOpen={isOpenEditUser} content={contentDialog} />
          </>
        ) : (
          <div className="flex">
            {images.map((imageProduct) => (
              <Image
                key={imageProduct.id}
                src={imageProduct.urlImage}
                alt={`slide ${imageProduct.id}`}
                className={`w-24 h-24 object-cover rounded-xl transition-opacity ease-linear duration-300 m-4`}
                width="500"
                height="500"
              />
            ))}
          </div>
        )}
      </Modal>
    </>
  )
}

ProductAdmin.getLayout = function (page) {
  return (
    <AppContextProvider>
      <LayoutAdmin>{page}</LayoutAdmin>
    </AppContextProvider>
  )
}

export default ProductAdmin
