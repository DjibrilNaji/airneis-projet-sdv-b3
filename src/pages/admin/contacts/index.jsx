import LayoutAdmin from "@/web/components/Admin/LayoutAdmin/LayoutAdmin"
import { useCallback, useEffect, useState } from "react"
import useAppContext, { AppContextProvider } from "@/web/hooks/useAppContext"
import FormError from "@/web/components/FormError"
import ConfirmDelete from "@/web/components/Admin/ConfirmDelete"
import ContentPage from "@/web/components/Admin/ContentPage"
import DeleteAllButton from "@/web/components/Admin/Button/DeleteAllButton"
import CenterItem from "@/web/components/CenterItem"

const ContactAdmin = () => {
  const [data, setData] = useState([])
  const [totalPages, setTotalPages] = useState("")

  const [searchTerm, setSearchTerm] = useState(null)
  const [error, setError] = useState("")

  const [toggleDeleteSeveral, setToggleDeleteSeveral] = useState(false)

  const {
    state: {
      limit,
      currentPage,
      sortColumn,
      order,
      selectedItems,
      itemIdToRemove,
      toggleDeleteOne,
    },
    actions: {
      getContact,
      deleteContact,
      setSelectedItems,
      setToggleDeleteOne,
    },
  } = useAppContext()

  const fetchData = useCallback(
    async (page) => {
      const [err, data] = await getContact(
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

      const totalMessages = data.result.meta.count
      const totalPages = Math.ceil(totalMessages / limit)

      setTotalPages(totalPages)
      setData(data.result)
    },
    [order, limit, sortColumn, searchTerm, getContact]
  )

  useEffect(() => {
    fetchData(currentPage)
  }, [currentPage, fetchData])

  const handleDelete = useCallback(
    async (contactId) => {
      const [err] = await deleteContact(contactId)

      if (err) {
        setError(err)

        return
      }

      fetchData(currentPage)
      setSelectedItems([])
      setToggleDeleteOne(false)
      setToggleDeleteSeveral(false)
    },
    [
      fetchData,
      currentPage,
      deleteContact,
      setSelectedItems,
      setToggleDeleteOne,
    ]
  )

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
      displayName: "Email",
      fieldName: "email",
      handleSort: true,
    },
    {
      displayName: "Messages",
      handleSort: false,
    },
    {
      displayName: "Actions",
      handleSort: false,
    },
  ]

  return (
    <>
      <CenterItem
        className="md:hidden"
        content="Use a larger screen to access the backoffice"
      />

      <div className="hidden md:block">
        {error ? <FormError error={error} /> : ""}

        <ConfirmDelete
          isOpen={toggleDeleteOne || toggleDeleteSeveral}
          page="messages"
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
          title="Messages"
          data={data.contacts}
          columnsTableHead={columnsTableHead}
          columnsTableBody={["id", "email", "message"]}
          name={"messages"}
          totalPages={totalPages}
          searchTerm={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          displayDeleteButton={true}
        />

        {data.contacts?.length > 0 && (
          <DeleteAllButton
            title="Delete all selected messages"
            className="mx-3"
            onClick={() => setToggleDeleteSeveral(true)}
            disabled={selectedItems.length === 0}
          />
        )}
      </div>
    </>
  )
}

ContactAdmin.getLayout = function (page) {
  return (
    <AppContextProvider>
      <LayoutAdmin>{page}</LayoutAdmin>
    </AppContextProvider>
  )
}

export default ContactAdmin
