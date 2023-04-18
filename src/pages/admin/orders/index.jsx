import LayoutAdmin from "@/web/components/Admin/LayoutAdmin/LayoutAdmin"
import TableHeadField from "@/web/components/TableHeadField"
import config from "@/web/config"
import routes from "@/web/routes"
import {
  faArrowLeft,
  faArrowRight,
  faCircle,
  faEdit,
  faPlus,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"
import Link from "next/link"
import { useCallback, useEffect, useState } from "react"

const OrderAdmin = () => {
  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState("")

  const [limit] = useState(10)

  const fetchData = useCallback(
    async (page) => {
      const result = await axios.get(
        `${
          config.api.baseApiURL
        }${routes.api.admin.orders.collection()}?limit=${limit}&page=${page}`
      )

      const totalOrders = result.data.result.meta.count
      const totalPages = Math.ceil(totalOrders / limit)

      setTotalPages(totalPages)
      setData(result.data.result)
    },
    [limit]
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
          Orders
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
          <div>{pagination}</div>
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
            <TableHeadField displayName="Id" fieldName="id" />
            <TableHeadField displayName="Email" fieldName="email" />
            <TableHeadField
              className="px-10"
              displayName="Price"
              fieldName="price_formatted"
            />
            <th className="text-center py-2 px-1">Status</th>
            <th className="text-center py-2 px-1">Actions</th>
            <th className="text-center py-2 px-1">More</th>
          </tr>
        </thead>

        <tbody>
          {data.orders?.map((order) => (
            <tr
              key={order.id}
              className="border-b text-sm border-gray-300 py-2 px-4 text-center"
            >
              <td className="py-2 px-4">{order.id} </td>
              <td className="py-2 px-4">{order.email} </td>
              <td className="py-2 px-4">{order.price_formatted} </td>
              <td className="py-2 px-4">
                <FontAwesomeIcon
                  icon={faCircle}
                  className={`text-stone-400 h-5 ${
                    order.status === "Delivered"
                      ? "text-green-400"
                      : order.status === "Cancelled"
                      ? "text-red-400"
                      : "text-orange-400"
                  }`}
                />
              </td>

              <td className="py-2 px-4">
                <button
                  className="disabled:opacity-30 disabled:cursor-not-allowed"
                  disabled={
                    order.status === "Delivered" || order.status === "Cancelled"
                  }
                >
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="text-stone-400 h-5"
                  />
                </button>
              </td>
              <td>
                <Link
                  href={"/"}
                  className="border-2 px-2 py-1 rounded-full bg-gray-100 hover:bg-gray-200"
                >
                  <FontAwesomeIcon icon={faPlus} className="text-stone-400" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center gap-14 my-14">
        <span className="flex gap-2 items-center">
          <FontAwesomeIcon icon={faCircle} className="h-5 text-green-400" />
          <h3>Delivered</h3>
        </span>
        <span className="flex gap-2 items-center">
          <FontAwesomeIcon icon={faCircle} className="h-5 text-orange-400" />
          <h3>On standby</h3>
        </span>
        <span className="flex gap-2 items-center">
          <FontAwesomeIcon icon={faCircle} className="h-5 text-red-400" />
          <h3>Cancelled</h3>
        </span>
      </div>
    </>
  )
}

OrderAdmin.getLayout = function (page) {
  return <LayoutAdmin>{page}</LayoutAdmin>
}

export default OrderAdmin
