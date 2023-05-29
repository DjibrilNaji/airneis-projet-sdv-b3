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
import useAppContext, { AppContextProvider } from "@/web/hooks/useAppContext"
import FormError from "@/web/components/FormError"

const UsersAdmin = () => {
  const {
    actions: { getUsers, deleteUser },
  } = useAppContext()

  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState("")

  const [sortColumn, setSortColumn] = useState("id")
  const [order, setOrder] = useState("asc")
  const [limit, setLimit] = useState(10)
  const [searchTerm, setSearchTerm] = useState(null)

  const [selectedUsers, setSelectedUsers] = useState([])
  const [error, setError] = useState("")

  const fetchData = useCallback(
    async (page) => {
      const [err, data] = await getUsers(
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

      const totalUsers = data.result.meta.count
      const totalPages = Math.ceil(totalUsers / limit)

      setTotalPages(totalPages)
      setData(data.result)
    },
    [order, sortColumn, limit, searchTerm, getUsers]
  )

  useEffect(() => {
    fetchData(currentPage)
  }, [currentPage, fetchData])

  const handleDelete = useCallback(
    async (userId) => {
      const [err] = await deleteUser(userId)

      if (err) {
        setError(err)

        return
      }

      fetchData(currentPage)
      setSelectedUsers([])
    },
    [fetchData, currentPage, deleteUser]
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
      if (selectedUsers.includes(userId)) {
        setSelectedUsers(selectedUsers.filter((id) => id !== userId))
      } else {
        setSelectedUsers([...selectedUsers, userId])
      }
    },
    [selectedUsers]
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
          Users
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
        <div className="flex gap-2 my-6 mx-1">
          <span>Show</span>
          <select
            name="country"
            className="px-1 border-2 rounded-lg md:px-3 text-right focus:outline-none"
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
          <span>users per page</span>
        </div>
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
      <table className="w-full">
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
            <TableHeadField
              displayName="Username"
              handleSortChange={handleSortChange}
              fieldName="userName"
            />

            <th className="py-2 px-4">Active</th>
            <th className="py-2 px-1">Actions</th>
            <th className="py-2 px-4">More</th>
          </tr>
        </thead>

        <tbody>
          {data.users?.map((user) => (
            <tr key={user.id} className="border-b text-sm border-gray-300">
              <td className="py-2 px-4">
                <input
                  type="checkbox"
                  className="h-5 w-5 border-2 appearance-none checked:bg-stone-500 cursor-pointer disabled:cursor-not-allowed"
                  disabled={user.isDelete}
                  checked={selectedUsers.includes(user.id)}
                  onChange={() => handleSelectItem(user.id)}
                />
              </td>
              <td className="py-2 px-4">{user.id} </td>
              <td className="py-2 px-4">{user.email}</td>
              <td className="py-2 px-4">{user.userName}</td>
              <td className="py-2 px-4">
                {user.isDelete ? (
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
                  onClick={() => handleDelete(user.id)}
                  disabled={user.isDelete}
                >
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="text-stone-400 h-5"
                  />
                </button>
              </td>

              <td className="py-2 px-4 flex">
                <Link
                  href={routes.admin.users.single(user.id)}
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
          onClick={() => selectedUsers.map((id) => handleDelete(id))}
          disabled={selectedUsers.length === 0}
        >
          Supprimer tous les éléments séléctionnés
        </button>

        <Link
          href={routes.admin.users.create()}
          className="border-2 rounded-lg mx-3 my-4 p-2 bg-blue-500 text-white w-fit"
        >
          Ajouter un utilisateur
        </Link>
      </div>
    </>
  )
}

UsersAdmin.getLayout = function (page) {
  return (
    <AppContextProvider>
      <LayoutAdmin>{page}</LayoutAdmin>
    </AppContextProvider>
  )
}

export default UsersAdmin
