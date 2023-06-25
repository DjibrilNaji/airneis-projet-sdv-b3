import LayoutAdmin from "@/web/components/Admin/LayoutAdmin/LayoutAdmin"
import { useCallback, useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faArrowLeft,
  faArrowRight,
  faCheck,
  faEdit,
  faPlus,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons"
import TableHeadField from "@/web/components/Admin/Table/TableHeadField"
import useAppContext, { AppContextProvider } from "@/web/hooks/useAppContext"
import FormError from "@/web/components/FormError"
import SelectShow from "@/web/components/Admin/SelectAndSearch/SelectShow"
import Modal from "@/web/components/Modal"
import EditCategoryForm from "@/web/components/Admin/Form/EditCategoryForm"

const CategoriesAdmin = () => {
  const types = {
    category: { name: "category", title: "Category informations" },
    images: { name: "images", title: "Images Category" },
  }

  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState("")

  const [sortColumn, setSortColumn] = useState("id")
  const [order, setOrder] = useState("asc")
  const [limit, setLimit] = useState(10)
  const [searchTerm, setSearchTerm] = useState("")
  const [error, setError] = useState(null)
  const [selectedType, setSelectedType] = useState(types.category)
  const [viewCategoryInfo, setViewCategoryInfo] = useState(false)
  const [toggleUpdateCategory, setToggleUpdateCategory] = useState(true)
  const [category, setCategory] = useState(null)

  const {
    actions: {
      getAllCategories,
      deleteCategory,
      getSingleCategory,
      updateCategory,
    },
  } = useAppContext()

  const fetchData = useCallback(
    async (page) => {
      const [err, data] = await getAllCategories(
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

      const totalCategories = data.result.meta.count
      const totalPages = Math.ceil(totalCategories / limit)

      setTotalPages(totalPages)
      setData(data.result)
    },
    [order, limit, sortColumn, searchTerm, getAllCategories]
  )

  useEffect(() => {
    fetchData(currentPage)
  }, [currentPage, fetchData])

  const handlePageChange = useCallback(
    (newPage) => {
      setCurrentPage(newPage)
      fetchData(newPage)
    },
    [fetchData]
  )

  const handleLimitChange = useCallback(
    (e) => {
      setLimit(e.target.value)
      fetchData
    },
    [fetchData]
  )

  const fetchSingleCategory = useCallback(
    async (id) => {
      const [err, data] = await getSingleCategory(id)

      if (err) {
        setError(err)

        return
      }

      setCategory(data.result[0])
      setViewCategoryInfo(true)
    },
    [getSingleCategory]
  )

  const handleSubmitUpdate = useCallback(
    async (values) => {
      const [err, data] = await updateCategory(category.id, values)

      if (err) {
        setError(err)

        return
      }

      setCategory(data.result)
      setToggleUpdateCategory(!toggleUpdateCategory)
      fetchData(currentPage)
    },
    [category, updateCategory, toggleUpdateCategory, fetchData, currentPage]
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

  const handleDelete = useCallback(
    async (categoryId) => {
      const [err] = await deleteCategory(categoryId)

      if (err) {
        setError(err)

        return
      }

      fetchData(currentPage)
    },
    [deleteCategory, fetchData, currentPage]
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
          Categories
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
        <SelectShow
          limit={limit}
          handleLimitChange={handleLimitChange}
          name={"categories"}
        />

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
              displayName="Slug"
              handleSortChange={handleSortChange}
              fieldName="slug"
              className="hidden md:table-cell"
            />
            <th className="py-2 px-4 hidden md:table-cell">Active</th>
            <th className="py-2 px-1">Actions</th>
            <th className="py-2 px-4">More</th>
          </tr>
        </thead>

        <tbody>
          {data.categories?.map((category) => (
            <tr key={category.id} className="border-b text-sm border-gray-300">
              <td className="py-2 px-4">
                <input
                  type="checkbox"
                  className="h-5 w-5 border-2 appearance-none checked:bg-stone-500 cursor-pointer"
                />
              </td>
              <td className="py-2 px-4">{category.id} </td>
              <td className="py-2 px-4">{category.name}</td>
              <td className="py-2 px-4">{category.description}</td>
              <td className="py-2 px-4 hidden md:table-cell">
                {category.slug}
              </td>
              <td className="py-2 px-4 hidden md:table-cell">
                {category.isDelete ? (
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
                <div className="flex gap-2">
                  <button
                    className="disabled:opacity-30 disabled:cursor-not-allowed"
                    onClick={() => handleDelete(category.id)}
                    disabled={category.isDelete}
                  >
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="text-stone-400 h-5"
                    />
                  </button>
                </div>
              </td>
              <td className="py-2 px-4 flex justify-center">
                <button
                  onClick={() => fetchSingleCategory(category.id)}
                  className="border-2 px-2 py-1 rounded-full bg-gray-100 hover:bg-gray-200"
                >
                  <FontAwesomeIcon icon={faPlus} className="text-stone-400" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        isOpen={viewCategoryInfo}
        modalTitle={selectedType.title}
        closeModal={() => setViewCategoryInfo(false)}
      >
        <div className="flex gap-4">
          <button
            onClick={() => setSelectedType(types.category)}
            className={`flex ${
              selectedType.name === types.category.name && "font-bold underline"
            }`}
          ></button>
        </div>
        <>
          <div className="border-t-4 border-gray-500 px-3 my-4" />
          <div className="flex items-center justify-between ">
            <div className="px-4">
              {category?.isDelete ? (
                <span className="italic text-red-500 text-lg">
                  (Category delete : id {category?.id})
                </span>
              ) : (
                <span className="italic text-green-500 text-lg">
                  (Category active : id {category?.id})
                </span>
              )}
            </div>
            {!category?.isDelete && (
              <button
                className="flex justify-end text-stone-500 font-bold text-lg rounded"
                onClick={() => setToggleUpdateCategory(!toggleUpdateCategory)}
                title={
                  toggleUpdateCategory
                    ? "Update Category"
                    : "Finish modifications"
                }
              >
                <FontAwesomeIcon
                  icon={toggleUpdateCategory ? faEdit : faCheck}
                  className="h-7"
                />
              </button>
            )}
          </div>
          <EditCategoryForm
            initialValues={category}
            onSubmit={handleSubmitUpdate}
            active={toggleUpdateCategory}
          />
        </>
      </Modal>
    </>
  )
}

CategoriesAdmin.getLayout = function (page) {
  return (
    <AppContextProvider>
      <LayoutAdmin>{page}</LayoutAdmin>
    </AppContextProvider>
  )
}

export default CategoriesAdmin
