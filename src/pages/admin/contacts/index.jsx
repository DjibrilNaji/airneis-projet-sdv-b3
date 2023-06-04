import LayoutAdmin from "@/web/components/Admin/LayoutAdmin/LayoutAdmin"
import { useCallback, useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faArrowLeft,
  faArrowRight,
  faTrash,
} from "@fortawesome/free-solid-svg-icons"
import TableHeadField from "@/web/components/Admin/TableHeadField"
import useAppContext, { AppContextProvider } from "@/web/hooks/useAppContext"
import FormError from "@/web/components/FormError"
import SelectShow from "@/web/components/Admin/SelectShow"

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

      <div className="flex item-center justify-center mb-5">
        <span className="font-extrabold text-3xl text-stone-500 uppercase">
          Messages
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
          name={"messages"}
        />
        <div className="mx-1">
          <input
            type="text"
            placeholder="Search"
            className="border-2 border-stone-500 rounded-lg px-2 focus:outline-none"
            value={searchTerm == null ? "" : searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <table className="w-[100vw]">
        <thead className="text-xs text-left uppercase bg-gray-50 text-gray-700">
          <tr>
            <th className="py-2 px-1">Select</th>
            <TableHeadField
              displayName="Id"
              handleSortChange={handleSortChange}
              fieldName="id"
            />
            <TableHeadField
              displayName="Email"
              handleSortChange={handleSortChange}
              fieldName="email"
            />
            <th className="py-2 px-4">Message</th>
            <th className="py-2 px-1">Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.contacts?.map((message) => (
            <tr key={message.id} className="border-b text-sm border-gray-300">
              <td className="py-2 px-4">
                <input
                  type="checkbox"
                  className="h-5 w-5 border-2 appearance-none checked:bg-stone-500 cursor-pointer disabled:cursor-not-allowed"
                  disabled={message.isDelete}
                  checked={selectedContacts.includes(message.id)}
                  onChange={() => handleSelectItem(message.id)}
                />
              </td>
              <td className="py-2 px-4">{message.id} </td>
              <td className="py-2 px-4">{message.email}</td>
              <td className="py-2 px-4">{message.message}</td>
              <td className="text-center">
                <button
                  className="disabled:opacity-30 disabled:cursor-not-allowed"
                  onClick={() => handleDelete(message.id)}
                >
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="text-stone-400 h-5"
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        className="border-2 rounded-lg mx-3 my-4 p-2 bg-red-500 text-white disabled:cursor-not-allowed disabled:bg-red-200"
        onClick={() => selectedContacts.map((id) => handleDelete(id))}
        disabled={selectedContacts.length === 0}
      >
        Supprimer tous les messages séléctionnés
      </button>
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
