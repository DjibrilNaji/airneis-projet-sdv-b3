import ModalButtonInfo from "@/web/components/Admin/Button/ModalButtonInfo"
import ContentPage from "@/web/components/Admin/ContentPage"
import LayoutAdmin from "@/web/components/Admin/LayoutAdmin/LayoutAdmin"
import CenterItem from "@/web/components/CenterItem"
import FormError from "@/web/components/FormError"
import Modal from "@/web/components/Modal"
import useAppContext, { AppContextProvider } from "@/web/hooks/useAppContext"
import routes from "@/web/routes"
import { faCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import Link from "next/link"
import { useCallback, useEffect, useState } from "react"

const OrderAdmin = () => {
  const {
    state: { currentPage, sortColumn, order, limit },
    actions: { getOrders, getSingleOrder },
  } = useAppContext()

  const [data, setData] = useState([])
  const [totalPages, setTotalPages] = useState("")
  const [searchTerm, setSearchTerm] = useState(null)

  const [error, setError] = useState("")

  const columnsTableHead = [
    {
      displayName: "Id",
      fieldName: "id",
      handleSort: true,
    },
    {
      displayName: "Email",
      fieldName: "email",
      handleSort: true,
    },
    {
      displayName: "Price",
      fieldName: "price",
      handleSort: true,
    },
    {
      displayName: "Status",
      handleSort: false,
    },
    {
      displayName: "More",
      handleSort: false,
    },
  ]

  const types = {
    summary: { button: "Summary", name: "summary", title: "Summary" },
    products: { button: "Products", name: "products", title: "Products" },
  }

  const [products, setProducts] = useState("")
  const [selectedType, setSelectedType] = useState(types.summary)
  const [viewOrderInfo, setViewOrderInfo] = useState(false)
  const [singleOrder, setSingleOrder] = useState("")
  const [addressOrder, setAddressOrder] = useState("")

  const fetchData = useCallback(
    async (page) => {
      const [err, data] = await getOrders(
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

      const totalOrders = data.result.meta.count
      const totalPages = Math.ceil(totalOrders / limit)

      setTotalPages(totalPages)
      setData(data.result)
    },
    [limit, searchTerm, getOrders, sortColumn, order]
  )

  useEffect(() => {
    fetchData(currentPage)
  }, [currentPage, fetchData])

  const fetchSingleOrder = async (id) => {
    const [err, order] = await getSingleOrder(id)

    if (err) {
      setError(err)

      return
    }

    setSingleOrder(order.order)
    setProducts(order.products)
    setAddressOrder(order.order.address[0])
    setViewOrderInfo(true)
  }

  const creationDate = new Date(singleOrder.createdAt).toLocaleDateString("fr")

  return (
    <>
      <CenterItem
        className="md:hidden"
        content="Use a larger screen to access the backoffice"
      />

      <div className="hidden md:block">
        {error ? <FormError error={error} /> : ""}

        <ContentPage
          title="Orders"
          data={data.orders}
          columnsTableHead={columnsTableHead}
          columnsTableBody={["id", "userEmail", "total_price"]}
          name={"orders"}
          totalPages={totalPages}
          searchTerm={searchTerm}
          fetchSingleItem={fetchSingleOrder}
          onChange={(e) => setSearchTerm(e.target.value)}
          getInfo={true}
          displayStatus={true}
        />

        {data.orders?.length > 0 && (
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
        )}

        <Modal
          isOpen={viewOrderInfo}
          modalTitle={selectedType.title}
          closeModal={() => setViewOrderInfo(false)}
        >
          <div className="flex gap-4">
            {Object.values(types).map((type) => (
              <ModalButtonInfo
                key={type.name}
                title={type.button}
                onClick={() => setSelectedType(type)}
                selectedType={selectedType}
                type={type}
              />
            ))}
          </div>

          {selectedType.name === types.summary.name ? (
            <>
              <div className="mt-4">
                <span className="font-bold text-lg">
                  Order number :
                  <i className="text-md font-normal">
                    {" "}
                    {singleOrder.numberOrder}
                  </i>
                </span>
                <div className="flex flex-row gap-3 font-bold text-lg">
                  User id :
                  <span className="text-md font-normal">
                    {singleOrder.userId}
                  </span>
                </div>
              </div>
              <div className="mt-4 border-2 rounded-lg w-fit">
                <div className="flex justify-between items-center bg-gray-300 p-4 rounded-t-md ">
                  <i>
                    Status :{" "}
                    <span
                      className={`font-bold ${
                        singleOrder.status === "Delivered"
                          ? "text-green-500"
                          : singleOrder.status === "Cancelled"
                          ? "text-red-500"
                          : "text-orange-500"
                      }`}
                    >
                      {singleOrder.status}
                    </span>
                  </i>
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
                      <span>
                        {(singleOrder.price - singleOrder.amount_tva).toFixed(
                          2
                        )}{" "}
                        €
                      </span>
                    </span>
                    <span className="flex justify-between">
                      VAT : <span>{singleOrder.amount_tva} €</span>
                    </span>
                    <span className="flex justify-between text-xl font-bold gap-4">
                      Total : <span> {singleOrder.total_price} €</span>
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
