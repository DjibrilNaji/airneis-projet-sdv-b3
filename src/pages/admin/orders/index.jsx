import LayoutAdmin from "@/web/components/Admin/LayoutAdmin/LayoutAdmin"
import Pagination from "@/web/components/Admin/Pagination"
import FormError from "@/web/components/FormError"
import Modal from "@/web/components/Modal"
import TableHeadField from "@/web/components/TableHeadField"
import useAppContext, { AppContextProvider } from "@/web/hooks/useAppContext"
import routes from "@/web/routes"
import { faCircle, faEdit, faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import Link from "next/link"
import { useCallback, useEffect, useState } from "react"

const OrderAdmin = () => {
  const {
    actions: { getOrders, getSingleOrder },
  } = useAppContext()

  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState("")
  const [limit] = useState(10)
  const [searchTerm, setSearchTerm] = useState(null)

  const [error, setError] = useState("")

  const types = {
    summary: { name: "summary", title: "Summary" },
    products: { name: "products", title: "Products" },
  }

  const [products, setProducts] = useState("")
  const [selectedType, setSelectedType] = useState(types.summary)
  const [viewOrderInfo, setViewOrderInfo] = useState(false)
  const [order, setOrder] = useState("")
  const [addressOrder, setAddressOrder] = useState("")

  const fetchData = useCallback(
    async (page) => {
      const [err, data] = await getOrders(limit, page, searchTerm)

      if (err) {
        setError(err)

        return
      }

      const totalOrders = data.result.meta.count
      const totalPages = Math.ceil(totalOrders / limit)

      setTotalPages(totalPages)
      setData(data.result)
    },
    [limit, searchTerm, getOrders]
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

  const fetchSingleOrder = async (id) => {
    const [err, order] = await getSingleOrder(id)

    if (err) {
      setError(err)

      return
    }

    setOrder(order.order)
    setProducts(order.products)
    setAddressOrder(order.order.address[0])
    setViewOrderInfo(true)
  }

  const creationDate = new Date(order.createdAt).toLocaleDateString("fr")

  return (
    <>
      {error ? <FormError error={error} /> : ""}

      <div className="flex item-center justify-center mb-5">
        <span className="font-extrabold text-3xl text-stone-500 uppercase">
          Orders
        </span>
      </div>

      {data.orders?.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      )}

      <div className="flex items-center justify-between">
        <div className="flex gap-2 my-6 mx-1"></div>
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

      {data.orders?.length > 0 && (
        <>
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
                  <td className="py-2 px-4">{order.user.email} </td>
                  <td className="py-2 px-4">{order.total_price} € </td>
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
                        order.status === "Delivered" ||
                        order.status === "Cancelled"
                      }
                    >
                      <FontAwesomeIcon
                        icon={faEdit}
                        className="text-stone-400 h-5"
                      />
                    </button>
                  </td>
                  <td>
                    <button onClick={() => fetchSingleOrder(order.id)}>
                      <FontAwesomeIcon
                        icon={faPlus}
                        className="border-2 px-2 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-stone-400"
                      />
                    </button>
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
              <FontAwesomeIcon
                icon={faCircle}
                className="h-5 text-orange-400"
              />
              <h3>On standby</h3>
            </span>
            <span className="flex gap-2 items-center">
              <FontAwesomeIcon icon={faCircle} className="h-5 text-red-400" />
              <h3>Cancelled</h3>
            </span>
          </div>
        </>
      )}

      <Modal
        isOpen={viewOrderInfo}
        modalTitle={selectedType.title}
        closeModal={() => setViewOrderInfo(false)}
      >
        <div className="flex gap-4">
          <button
            onClick={() => setSelectedType(types.summary)}
            className={`flex ${
              selectedType.name === types.summary.name && "font-bold underline"
            }`}
          >
            {types.summary.title}
          </button>
          <button
            onClick={() => setSelectedType(types.products)}
            className={`flex ${
              selectedType.name === types.products.name && "font-bold underline"
            }`}
          >
            {types.products.title}
          </button>
        </div>

        {selectedType.name === types.summary.name ? (
          <>
            <div className="mt-4">
              <span className="font-bold text-lg">
                Order number :
                <i className="text-md font-normal"> {order.numberOrder}</i>
              </span>
              <div className="flex flex-row gap-3 font-bold text-lg">
                User id :
                <span className="text-md font-normal">{order.userId}</span>
              </div>
            </div>
            <div className="mt-4 border-2 rounded-lg w-fit">
              <div className="flex justify-between items-center bg-gray-300 p-4 rounded-t-md">
                <i>(Status : {order.status})</i>
              </div>

              <div className="flex flex-col gap-10 md:flex-row md:justify-between p-4">
                <div className="flex flex-col">
                  Ordered on {creationDate}
                  <span className="font-bold mt-4">
                    Phone number :{" "}
                    <span className="font-normal">
                      {addressOrder.phoneNumber}
                    </span>
                  </span>
                  <span className="font-bold mt-4">Delivery address :</span>
                  <span>
                    {addressOrder.firstName} {addressOrder.lastName}
                  </span>
                  <span>{addressOrder.addressOrderFull}</span>
                  <span>
                    {addressOrder.city}, {addressOrder.cp}
                  </span>
                  <span>{addressOrder.country}</span>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="font-bold">Order summary :</div>
                  <span className="flex justify-between">
                    Amount ET :{" "}
                    <span>{(order.price - order.amount_tva).toFixed(2)} €</span>
                  </span>
                  <span className="flex justify-between">
                    VAT : <span>{order.amount_tva} €</span>
                  </span>
                  <span className="flex justify-between text-xl font-bold gap-4">
                    Total : <span> {order.total_price} €</span>
                  </span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col p-4 w-fit rounded-lg">
            <div className="bg-gray-300 p-4 font-bold text-lg rounded-t-lg">
              {products.length} products
            </div>

            <div className="border-2 rounded-b-lg">
              {products.map((item) => (
                <div
                  key={item.productId}
                  className="flex flex-col p-4 gap-4 border-b border-2 md:flex-row"
                >
                  <Image
                    src={item.product.image[0].urlImage}
                    alt="slide 2"
                    className="w-full h-56 md:w-36 md:h-36 object-cover rounded-xl"
                    width="500"
                    height="500"
                  />
                  <div className="w-full">
                    <div className="flex justify-between">
                      <Link
                        href={routes.product(item.product.slug)}
                        className="font-bold text-lg"
                      >
                        {item.product.name}
                      </Link>

                      <span className="font-semibold text-lg">
                        {item.product.price} €
                      </span>
                    </div>

                    <p className="truncate-2 w-[80%]">
                      {item.product.description}
                    </p>

                    <div className="flex flex-col w-full items-end md:flex-col">
                      <span className="text-stone-500 italic">
                        Quantity : x{item.quantity}
                      </span>

                      <span className="font-bold text-stone-500">
                        Total price : {item.product.price * item.quantity}€
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>

      <div
        className={`${
          data.orders?.length > 0
            ? "hidden"
            : typeof data.orders === "undefined"
            ? "hidden"
            : "flex"
        } items-center justify-center mb-5`}
      >
        <span className="font-bold text-3xl text-black ">
          There are no orders
        </span>
      </div>
    </>
  )
}

OrderAdmin.getLayout = function (page) {
  return (
    <AppContextProvider>
      <LayoutAdmin>{page}</LayoutAdmin>
    </AppContextProvider>
  )
}

export default OrderAdmin
