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
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState("")

  const [sortColumn, setSortColumn] = useState("id")
  const [order, setOrder] = useState("asc")
  const [limit, setLimit] = useState(10)
  const [searchTerm, setSearchTerm] = useState(null)
  const [error, setError] = useState("")

  const [selectedContacts, setSelectedContacts] = useState([])
  const [toggleDeleteOne, setToggleDeleteOne] = useState(false)
  const [toggleDeleteSeveral, setToggleDeleteSeveral] = useState(false)
  const [contactIdToRemove, setContactIdToRemove] = useState()

  const {
    actions: { getContact, deleteContact },
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
      setSelectedContacts([])
      setToggleDeleteOne(false)
      setToggleDeleteSeveral(false)
    },
    [fetchData, currentPage, deleteContact]
  )

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
      setCurrentPage(1)
      fetchData(1)
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

  const handleSelectItem = useCallback(
    (userId) => {
      if (selectedContacts.includes(userId)) {
        setSelectedContacts(selectedContacts.filter((id) => id !== userId))
      } else {
        setSelectedContacts([...selectedContacts, userId])
      }
    },
    [selectedContacts]
  )

  const selectContactToRemove = useCallback((id) => {
    setToggleDeleteOne(true)
    setContactIdToRemove(id)
  }, [])

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
              ? () => selectedContacts.map((id) => handleDelete(id))
              : () => handleDelete(contactIdToRemove)
          }
        />

        <ContentPage
          title="Messages"
          data={data.contacts}
          columnsTableHead={columnsTableHead}
          columnsTableBody={["id", "email", "message"]}
          name={"messages"}
          currentPage={currentPage}
          totalPages={totalPages}
          limit={limit}
          searchTerm={searchTerm}
          selectedItems={selectedContacts}
          handlePageChange={handlePageChange}
          handleLimitChange={handleLimitChange}
          handleSortChange={handleSortChange}
          handleSelectItem={handleSelectItem}
          selectItemToRemove={selectContactToRemove}
          onChange={(e) => setSearchTerm(e.target.value)}
          getInfo={false}
          displayIsDelete={false}
          displayDeleteButton={true}
          displayStatus={false}
        />

        <DeleteAllButton
          title="Delete all selected messages"
          className="mx-3"
          onClick={() => setToggleDeleteSeveral(true)}
          disabled={selectedContacts.length === 0}
        />
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
