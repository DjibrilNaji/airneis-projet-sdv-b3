import LayoutAdmin from "@/web/components/Admin/LayoutAdmin/LayoutAdmin"
import axios from "axios"
import Link from "next/link"
import { useCallback, useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faArrowLeft,
  faArrowRight,
  faPlus,
} from "@fortawesome/free-solid-svg-icons"
import TableHeadField from "@/web/components/Admin/TableHeadField"

const ContactAdmin = () => {
  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState("")

  const [order, setOrder] = useState("asc")
  const [limit, setLimit] = useState(10)

  const fetchData = useCallback(
    async (page) => {
      const result = await axios.get(
        `/api/contact?limit=${limit}&page=${page}&order=${order}`
      )

      const totalMessages = result.data.result.meta.count
      const totalPages = Math.ceil(totalMessages / limit)

      setTotalPages(totalPages)
      setData(result.data.result)
    },
    [order, limit]
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

      <table className="w-[100vw]">
        <thead className="text-xs text-left uppercase bg-gray-50 text-gray-700">
          <tr>
            <th className="py-2 px-1">Select</th>
            <TableHeadField displayName="Id" />
            <TableHeadField displayName="Email" />
            <TableHeadField displayName="Message" />
            <th className="py-2 px-4">More</th>
          </tr>
        </thead>

        <tbody>
          {data.contacts?.map((message) => (
            <tr key={message.id} className="border-b text-sm border-gray-300">
              <td className="py-2 px-4">
                <input
                  type="checkbox"
                  className="h-5 w-5 border-2 appearance-none checked:bg-stone-500 cursor-pointer disabled:cursor-not-allowed"
                />
              </td>
              <td className="py-2 px-4">{message.id} </td>
              <td className="py-2 px-4">{message.email}</td>
              <td className="py-2 px-4">{message.message}</td>

              <td className="py-2 px-4 flex">
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

ContactAdmin.getLayout = function (page) {
  return <LayoutAdmin>{page}</LayoutAdmin>
}

export default ContactAdmin
