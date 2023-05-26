import ListOrders from "@/web/components/ListOrders"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useState } from "react"
import cookie from "cookie"
import getAllOrderUserService from "@/web/services/order/getAllOrderUser"
import createAPIClient from "@/web/createAPIClient"

export const getServerSideProps = async ({ locale, params, req }) => {
  const userId = params.userId

  const { jwt } = cookie.parse(req ? req.headers.cookie || "" : document.cookie)

  const api = createAPIClient({ jwt, server: true })
  const getAllOrderUser = getAllOrderUserService({ api })

  const [err, data] = await getAllOrderUser(userId)

  if (err) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

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
