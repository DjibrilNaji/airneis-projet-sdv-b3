import ListOrders from "@/web/components/ListOrders"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useState } from "react"
import axios from "axios"
import cookie from "cookie"
import routes from "@/web/routes.js"
import config from "@/web/config"

export const getServerSideProps = async ({ locale, params, req }) => {
  const userId = params.userId

  const { token } = cookie.parse(
    req ? req.headers.cookie || "" : document.cookie
  )

  const { data } = await axios.get(
    `${config.api.baseURL}${routes.api.orders.collection(userId)}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )

  return {
    props: {
      orders: data,
      ...(await serverSideTranslations(locale, ["common", "navigation"])),
    },
  }
}

const ListOrder = (props) => {
  const {
    orders: { result },
  } = props

  const [years] = useState([])

  result.orders.map((order) =>
    years.includes(new Date(order.createdAt).getFullYear()) === true
      ? ""
      : years.push(new Date(order.createdAt).getFullYear())
  )

  return (
    <>
      <div className="h-24 flex items-center justify-center p-8">
        <span className="text-black uppercase font-bold text-2xl">
          My Orders
        </span>
      </div>
      {years.map((year, index) => (
        <div
          key={index}
          className="flex flex-col justify-center items-center mb-5"
        >
          <h1 className="text-center text-xl font-bold border-solid border-b-2 w-full border-black mb-4">
            {year}
          </h1>
          <ListOrders filteredOrders={result.orders} dateYear={year} />
        </div>
      ))}
    </>
  )
}

ListOrder.isPublic = false

export default ListOrder
