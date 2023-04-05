import axios from "axios"
import routes from "@/web/routes"
import ListOrders from "@/web/components/ListOrders"
import config from "@/web/config"

export const getServerSideProps = async ({ params, req: { url } }) => {
  const userId = params.userId
  const query = Object.fromEntries(
    new URL(`http://example.com/${url}`).searchParams.entries()
  )

  const { data } = await axios.get(
    `${config.api.baseURL}${routes.api.orders.collection(userId, query)}`
  )

  return {
    props: {
      orders: data,
    },
  }
}

const listOrder = (props) => {
  const {
    orders: { result },
  } = props

  const Year = []
  result.orders.map((order) =>
    Year.includes(new Date(order.createdAt).getFullYear()) === true
      ? ""
      : Year.push(new Date(order.createdAt).getFullYear())
  )

  return (
    <>
      <div className="h-24 flex items-center justify-center p-8">
        <span className="text-black uppercase font-bold text-2xl">
          My Orders
        </span>
      </div>
      {Year.map((year, index) => (
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

listOrder.isPublic = false

export default listOrder
