import LayoutAdmin from "@/web/components/Admin/LayoutAdmin/LayoutAdmin"
import { useCallback, useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faEdit } from "@fortawesome/free-solid-svg-icons"
import useAppContext, { AppContextProvider } from "@/web/hooks/useAppContext"
import FormError from "@/web/components/Form/FormError"
import Modal from "@/web/components/Modal"
import EditCategoryForm from "@/web/components/Admin/Form/EditCategoryForm"
import ContentPage from "@/web/components/Admin/ContentPage"
import CenterItem from "@/web/components/Design/CenterItem"
import ConfirmDelete from "@/web/components/Admin/ConfirmDelete"
import DeleteAllButton from "@/web/components/Admin/Button/DeleteAllButton"
import Dialog from "@/web/components/Design/Dialog"

const CategoriesAdmin = () => {
  const types = {
    category: { name: "category", title: "Category informations" },
    images: { name: "images", title: "Images Category" },
  }

  const [data, setData] = useState([])
  const [totalPages, setTotalPages] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [error, setError] = useState(null)
  const [selectedType, setSelectedType] = useState(types.category)
  const [viewCategoryInfo, setViewCategoryInfo] = useState(false)
  const [toggleUpdateCategory, setToggleUpdateCategory] = useState(true)
  const [category, setCategory] = useState(null)
  const [toggleDeleteSeveral, setToggleDeleteSeveral] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [contentDialog, setContentDialog] = useState()
  const [isOpenEditCategory, setIsOpenEditCategory] = useState(false)

  const {
    state: {
      limit,
      sortColumn,
      order,
      currentPage,
      toggleDeleteOne,
      itemIdToRemove,
      selectedItems,
    },
    actions: {
      getAllCategories,
      deleteCategory,
      getSingleCategory,
      updateCategory,
      setToggleDeleteOne,
    },
  } = useAppContext()

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
      displayName: "Slug",
      fieldName: "slug",
      handleSort: true,
    },
    {
      displayName: "Active",
      handleSort: false,
    },
    {
      displayName: "Actions",
      handleSort: false,
    },
    {
      displayName: "More",
      handleSort: false,
    },
  ]

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
      setContentDialog("The category has been updated")
      setIsOpenEditCategory(true)
      setTimeout(() => setIsOpenEditCategory(false), 3000)
    },
    [category, updateCategory, toggleUpdateCategory, fetchData, currentPage]
  )

  const handleDelete = useCallback(
    async (categoryId) => {
      const [err] = await deleteCategory(categoryId)

      if (err) {
        setError(err)

        return
      }

      fetchData(currentPage)
      setToggleDeleteOne(false)
      setToggleDeleteSeveral(false)
      setContentDialog("The category has been deleted")
      setIsOpen(true)
      setTimeout(() => setIsOpen(false), 3000)
    },
    [deleteCategory, fetchData, currentPage, setToggleDeleteOne]
  )

  return (
    <>
      <CenterItem
        className="md:hidden"
        content="Use a larger screen to access the backoffice"
      />

      <div className="hidden md:block">
        {error ? <FormError error={error} /> : ""}

        <Dialog isOpen={isOpen} content={contentDialog} />

        <ConfirmDelete
          isOpen={toggleDeleteOne || toggleDeleteSeveral}
          page="categories"
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
          title="Categories"
          data={data.categories}
          columnsTableHead={columnsTableHead}
          columnsTableBody={["id", "name", "slug"]}
          name={"categories"}
          totalPages={totalPages}
          searchTerm={searchTerm}
          fetchSingleItem={fetchSingleCategory}
          onChange={(e) => setSearchTerm(e.target.value)}
          getInfo={true}
          displayIsDelete={true}
          displayDeleteButton={true}
          select={true}
        />

        {data.categories?.length > 0 && (
          <DeleteAllButton
            title="Delete all selected categories"
            className="mx-3"
            onClick={() => setToggleDeleteSeveral(true)}
            disabled={selectedItems.length === 0}
          />
        )}

        <Modal
          isOpen={viewCategoryInfo}
          modalTitle={selectedType.title}
          closeModal={() => setViewCategoryInfo(false)}
        >
          <div className="flex gap-4">
            <button
              onClick={() => setSelectedType(types.category)}
              className={`flex ${
                selectedType.name === types.category.name &&
                "font-bold underline"
              }`}
            >
              Categories
            </button>
          </div>

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
          <Dialog isOpen={isOpenEditCategory} content={contentDialog} />
        </Modal>
      </div>
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
