import ListOrders from "@/web/components/ListOrders"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useEffect, useState } from "react"
import useAppContext from "@/web/hooks/useAppContext"
import FormError from "@/web/components/FormError"

export const getServerSideProps = async ({ locale, params }) => {
  const userId = params.userId

  return {
    props: {
      userId: userId,
      ...(await serverSideTranslations(locale, ["common", "navigation"])),
    },
  }
}

const ListOrder = (props) => {
  const { userId } = props

  const {
    actions: { allOrderUser },
  } = useAppContext()

  const [years] = useState([])
  const [orders, setOrders] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const [err, data] = await allOrderUser(userId)

      if (err) {
        setError(err)

        return
      }

      setOrders(data.result.orders)
      data.result.orders.map((order) =>
        years.includes(new Date(order.createdAt).getFullYear()) === true
          ? ""
          : years.push(new Date(order.createdAt).getFullYear())
      )
    }
    fetchData()
  }, [allOrderUser, userId, years])

  return (
    <>
      {error ? (
        <FormError error={error} />
      ) : (
        <div className="h-24 flex items-center justify-center p-8">
          <span className="text-black uppercase font-bold text-2xl">
            My Orders
          </span>
        </div>
      )}
      {years.map((year, index) => (
        <div
          key={index}
          className="flex flex-col justify-center items-center mb-5"
        >
          <h1 className="text-center text-xl font-bold border-solid border-b-2 w-full border-black mb-4">
            {year}
          </h1>
          <ListOrders filteredOrders={orders} dateYear={year} />
        </div>
      ))}
    </>
  )
}

ListOrder.isPublic = false

export default ListOrder
