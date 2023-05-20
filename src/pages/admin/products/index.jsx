import LayoutAdmin from "@/web/components/Admin/LayoutAdmin/LayoutAdmin"
import Link from "next/link"
import { useCallback, useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faArrowLeft,
  faArrowRight,
  faCheck,
  faPlus,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons"
import TableHeadField from "@/web/components/Admin/TableHeadField"
import routes from "@/web/routes"
import useAppContext from "@/web/hooks/useAppContext.jsx"
import FormError from "@/web/components/FormError"

const ProductAdmin = () => {
  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState("")
  const [sortColumn, setSortColumn] = useState("id")
  const [order, setOrder] = useState("asc")
  const [limit, setLimit] = useState(10)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProducts, setSelectedProducts] = useState([])
  const [error, setError] = useState(null)

  const {
    actions: { getAllProducts, deleteProducts },
  } = useAppContext()

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
        setError(err)

        return
      }

      const totalProducts = data.result.meta.count
      const totalPages = Math.ceil(totalProducts / limit)
      setTotalPages(totalPages)
      setData(data.result)
    },
    [getAllProducts, limit, sortColumn, order, searchTerm]
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
      setSelectedProducts([])
    },
    [deleteProducts, fetchData, currentPage]
  )

  const handlePageChange = useCallback(
    (newPage) => {
      setCurrentPage(newPage)
      fetchData(newPage)
    },
    [fetchData]
  )

  const handleSelectItem = useCallback(
    (productId) => {
      if (selectedProducts.includes(productId)) {
        setSelectedProducts(selectedProducts.filter((id) => id !== productId))
      } else {
        setSelectedProducts([...selectedProducts, productId])
      }
    },
    [selectedProducts]
  )

  const handleLimitChange = useCallback(
    (e) => {
      setLimit(e.target.value)
      fetchData
    },
    [fetchData]
  )

  const handleSortChange = useCallback(
    (column) => {
      if (column === sortColumn) {
        setOrder(order === "asc" ? "desc" : "asc")
      } else {
        setSortColumn(column)
        setOrder("asc")
      }

      fetchData(currentPage)
    },
    [fetchData, currentPage, order, sortColumn]
  )

  const pagination = []
  for (let i = 1; i <= totalPages; i++) {
    pagination.push(
      <button
        key={i}
        className={`h-12 border-2 border-r-0 border-stone-500
               w-12  ${currentPage === i && "bg-stone-500 text-white"}`}
        onClick={() => handlePageChange(i)}
      >
        {i}
      </button>
    )
  }

  return (
    <>
      {error ? <FormError error={error} /> : ""}
      <div className="flex w-full justify-center mb-5">
        <span className="font-extrabold text-3xl text-stone-500 uppercase">
          Products
        </span>
      </div>
      <div className="flex justify-center my-5">
        <div className="flex">
          <button
            className={
              "h-12 border-2 border-r-0 text-stone-500  border-stone-500 px-4 rounded-l-lg hover:bg-stone-500 hover:text-white disabled:opacity-30 disabled:z-[-1]"
            }
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <div> {pagination}</div>
          <button
            className="h-12 border-2 text-stone-500  border-stone-500 px-4 rounded-r-lg hover:bg-stone-500 hover:text-white disabled:opacity-30 disabled:z-[-1]"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-2 my-6">
          <span>Show</span>
          <select
            name="country"
            className="border-2 rounded-lg px-3 text-right"
            value={limit}
            onChange={handleLimitChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="25">25</option>
            <option value="30">30</option>
          </select>
          <span>products per page</span>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search"
            className="border-2 border-stone-500 rounded-lg px-2 focus:outline-none"
            value={searchTerm == null ? "" : searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <table className="w-full">
        <thead className="text-xs text-left uppercase bg-gray-50 text-gray-700">
          <tr>
            <th className="py-2 px-4">Select</th>
            <TableHeadField
              displayName="Id"
              handleSortChange={handleSortChange}
              fieldName="id"
            />
            <TableHeadField
              displayName="Name"
              handleSortChange={handleSortChange}
              fieldName="name"
            />
            <TableHeadField
              displayName="Description"
              handleSortChange={handleSortChange}
              fieldName="description"
            />
            <TableHeadField
              displayName="Category"
              handleSortChange={handleSortChange}
              fieldName="category"
            />
            <TableHeadField
              displayName="Materials"
              handleSortChange={handleSortChange}
              fieldName="material"
            />
            <TableHeadField
              displayName="Price"
              handleSortChange={handleSortChange}
              fieldName="price"
              className="hidden md:table-cell"
            />
            <TableHeadField
              displayName="Stock"
              handleSortChange={handleSortChange}
              fieldName="stock"
              className="hidden md:table-cell"
            />
            <th className="py-2 px-4 hidden md:table-cell">Highlander</th>
            <th className="py-2 px-4 hidden md:table-cell">Active</th>
            <th className="py-2 px-1">Actions</th>
            <th className="py-2 px-4">More</th>
          </tr>
        </thead>

        <tbody>
          {data.products?.map((product) => (
            <tr key={product.id} className="border-b text-sm border-gray-300">
              <td className="py-2 px-4">
                <input
                  type="checkbox"
                  className="h-5 w-5 border-2 appearance-none checked:bg-stone-500 cursor-pointer"
                  disabled={product.isDelete}
                  checked={selectedProducts.includes(product.id)}
                  onChange={() => handleSelectItem(product.id)}
                />
              </td>
              <td className="py-2 px-4">{product.id} </td>
              <td className="py-2 px-4">{product.name}</td>
              <td className="py-2 px-4">{product.description}</td>
              <td className="py-2 px-4">{product.category[0].name}</td>
              <td className="py-2 px-4">
                {product.materials.map((mat, index) => (
                  <ul key={index}>
                    <li>{mat.nameMaterial}</li>
                  </ul>
                ))}
              </td>
              <td className="py-2 px-4 hidden md:table-cell">
                {product.price}
              </td>
              <td className="py-2 px-4 hidden md:table-cell">
                {product.stock}
              </td>
              <td className="py-2 px-4 hidden md:table-cell">
                {!product.highlander ? (
                  <FontAwesomeIcon
                    icon={faXmark}
                    className="h-6 text-red-500"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="h-6 text-green-500"
                  />
                )}
              </td>
              <td className="py-2 px-4 hidden md:table-cell">
                {product.isDelete ? (
                  <FontAwesomeIcon
                    icon={faXmark}
                    className="h-6 text-red-500"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="h-6 text-green-500"
                  />
                )}
              </td>
              <td className="text-center">
                <button
                  className="disabled:opacity-30 disabled:cursor-not-allowed"
                  onClick={() => handleDelete(product.id)}
                  disabled={product.isDelete}
                >
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="text-stone-400 h-5"
                  />
                </button>
              </td>
              <td className="py-2 px-4 flex justify-center">
                <Link
                  href={routes.admin.products.single(product.id)}
                  className="border-2 px-2 py-1 rounded-full bg-gray-100 hover:bg-gray-200"
                >
                  <FontAwesomeIcon icon={faPlus} className="text-stone-400" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex flex-col justify-start">
        <button
          className="border-2 rounded-lg mx-3 my-4 p-2 bg-red-500 text-white disabled:cursor-not-allowed disabled:bg-red-200 w-fit"
          onClick={() => selectedProducts.map((id) => handleDelete(id))}
          disabled={selectedProducts.length === 0}
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
    </>
  )
}

ProductAdmin.getLayout = function (page) {
  return <LayoutAdmin>{page}</LayoutAdmin>
}

export default ProductAdmin
