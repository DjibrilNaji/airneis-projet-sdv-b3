import LayoutAdmin from "@/web/components/Admin/LayoutAdmin/LayoutAdmin"
import axios from "axios"
import Link from "next/link"
import { useCallback, useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faArrowLeft,
  faArrowRight,
  faCheck,
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons"
import TableHeadField from "@/web/components/Admin/TableHeadField"

const UsersAdmin = () => {
  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  const [totalPages, setTotalPages] = useState("")

  const [sortColumn, setSortColumn] = useState("id")
  const [order, setOrder] = useState("asc")
  const [limit, setLimit] = useState(10)
  const [searchTerm, setSearchTerm] = useState(null)

  const fetchData = useCallback(
    async (page) => {
      const result = await axios.get(
        `/api/users?limit=${limit}&page=${page}&sortColumn=${sortColumn}&order=${order}` +
          (searchTerm === null ? "" : `&searchTerm=${searchTerm}`)
      )

      const totalUsers = result.data.result.meta.count
      const totalPages = Math.ceil(totalUsers / limit)
      setTotalPages(totalPages)
      setData(result.data.result)
    },
    [order, sortColumn, limit, searchTerm]
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
      <div className="flex w-full justify-center mb-5">
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
          <span>users per page</span>
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
              displayName="Email"
              handleSortChange={handleSortChange}
              fieldName="email"
            />
            <TableHeadField
              displayName="Username"
              handleSortChange={handleSortChange}
              fieldName="userName"
            />
            <TableHeadField
              displayName="First name"
              handleSortChange={handleSortChange}
              fieldName="firstName"
              className="hidden md:table-cell"
            />
            <TableHeadField
              displayName="Last name"
              handleSortChange={handleSortChange}
              fieldName="lastName"
              className="hidden md:table-cell"
            />
            <th className="py-2 px-4 hidden md:table-cell">Active</th>
            <th className="py-2 px-4">More</th>
          </tr>
        </thead>

        <tbody>
          {data.users?.map((user) => (
            <tr key={user.id} className="border-b text-sm border-gray-300">
              <td className="py-2 px-4">
                <input
                  type="checkbox"
                  className="h-5 w-5 border-2 appearance-none checked:bg-stone-500 cursor-pointer"
                />
              </td>
              <td className="py-2 px-4">{user.id} </td>
              <td className="py-2 px-4">{user.email}</td>
              <td className="py-2 px-4">{user.userName}</td>
              <td className="py-2 px-4 hidden md:table-cell">
                {user.firstName}
              </td>
              <td className="py-2 px-4 hidden md:table-cell">
                {user.lastName}
              </td>
              <td className="py-2 px-4 hidden md:table-cell">
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
              <td className="py-2 px-4 flex justify-center">
                <Link
                  href={""}
                  className="border-2 px-2 py-1 rounded-full bg-gray-100 hover:bg-gray-200"
                >
                  <FontAwesomeIcon icon={faPlus} className="text-stone-400" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

UsersAdmin.getLayout = function (page) {
  return <LayoutAdmin>{page}</LayoutAdmin>
}

export default UsersAdmin
