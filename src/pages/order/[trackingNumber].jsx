import axios from "axios"
import { useEffect, useState } from "react"
import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"

export const getServerSideProps = ({ params }) => ({
  props: {
    params: {
      trackingNumber: params.trackingNumber,
    },
  },
})

const Order = (props) => {
  const {
    params: { trackingNumber },
  } = props

  const [filteredOrders, setFilteredOrders] = useState([])
  const [items, setItems] = useState([])
  const [products, setProducts] = useState([])

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get("/api/orders")
      const filter = result.data.filter(
        (order) => order.trackingNumber === trackingNumber
      )
      setFilteredOrders(filter)
      const itemsOfOrder = filter.map((order) => order.items)[0]
      setItems(itemsOfOrder)
    }

    fetchData()
  }, [trackingNumber])

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get("/api/products")
      setProducts(
        result.data.filter(
          (product) => product.id === items.forEach((item) => item.idProduct)
        )[0]
      )
    }

    fetchData()
  }, [items])

  return (
    <>
      {filteredOrders.map((order, index) => (
        <div key={index}>
          <div className="h-40 flex items-center self-center justify-center">
            <span className="pl-10 md:pl-0 text-black uppercase font-bold text-2xl">
              Order #{order.trackingNumber} -{" "}
              {new Date(order.dateOfOrder).toLocaleDateString("fr")} -{" "}
              {order.status}
            </span>
          </div>
          <div className="grid px-2 gap-7 grid-cols-1 md:pb-10 md:grid-cols-2">
            <div className="order-1">
              {items.map((item) => (
                <div key={item.name} className="flex md:pl-64 pb-8">
                  <Image
                    src={`/assets/img/products/${products.img}`}
                    alt="slide 1"
                    className="h-32 w-32 md:h-72 md:w-64"
                    width="500"
                    height="500"
                  />
                  <div className="w-3/5 pl-2 md:pl-3">
                    <p className="font-bold text-sm md:text-2xl">{item.name}</p>
                    <p className="text-xs md:text-xl">{products.description}</p>
                  </div>
                  <div className="w-1/5">
                    <p className="flex place-content-center font-bold text-sm md:text-2xl">
                      {products.price} €
                    </p>
                    <div className="flex place-content-center">
                      <input
                        type="number"
                        className="w-6 h-6 text-sm md:w-16 md:h-16 md:text-xl"
                        min="1"
                        placeholder={item.quantity}
                      />
                    </div>
                    <div className="flex place-content-center">
                      <button>
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="flex place-content-center h-4 md:h-6 text-stone-400"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="md:pr-64 order-2">
              <div className="flex border-solid border-black border-b-4 pb-4">
                <div>
                  <p className="font-bold text-2xl pr-5">Amount : </p>
                  <p className="font-bold text-gray-400 text-lg pr-5">TVA : </p>
                </div>
                <div className="grow">
                  <p className="font-bold text-2xl text-end">{order.amount}</p>
                  <p className="font-bold text-gray-400 text-lg text-end">
                    {order.amount * 0.2}
                  </p>
                </div>
              </div>
              <div className="pt-4 border-solid border-black border-b-4 pb-4">
                <p className="font-bold text-2xl pr-5">Delivery address</p>
                {new Array(order.deliveryAddress).map((delAdd, index) => (
                  <div key={index}>
                    <p className="text-xl">
                      {delAdd.firstName} {delAdd.lastName}
                    </p>
                    <p className="text-xl">{delAdd.address}</p>
                    <p className="text-xl">
                      {delAdd.cp} {delAdd.city}
                    </p>
                    <p className="text-xl">{delAdd.country}</p>
                    <p className="text-xl">{delAdd.phoneNumber}</p>
                  </div>
                ))}
              </div>
              <div className="pt-4 border-solid border-black border-b-4 pb-4">
                <p className="font-bold text-2xl pr-5">Billing address</p>
                {new Array(order.billingAddress).map((delAdd, index) => (
                  <div key={index}>
                    <p className="text-xl">
                      {delAdd.firstName} {delAdd.lastName}
                    </p>
                    <p className="text-xl">{delAdd.address}</p>
                    <p className="text-xl">
                      {delAdd.cp} {delAdd.city}
                    </p>
                    <p className="text-xl">{delAdd.country}</p>
                    <p className="text-xl">{delAdd.phoneNumber}</p>
                  </div>
                ))}
              </div>
              <div className="pt-4">
                <p className="font-bold text-2xl pr-5">Method of payment</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default Order
