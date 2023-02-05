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
          <div className="h-48 flex items-center justify-center">
            <span className="text-black uppercase font-bold text-2xl">
              Order #{order.trackingNumber} -{" "}
              {new Date(order.dateOfOrder).toLocaleDateString("fr")} -{" "}
              {order.status}
            </span>
          </div>
          {items.map((item) => (
            <div
              key={item.name}
              className="grid px-2 gap-7 md:pb-10 md:grid-cols-2"
            >
              <div className="flex">
                <Image
                  src={`/assets/img/products/${products.img}`}
                  alt="slide 1"
                  className="h-48 w-40"
                  width="500"
                  height="500"
                />
                <div className="w-2/5 pl-3">
                  <p className="font-bold">{item.name}</p>
                  <p>{products.description}</p>
                </div>
                <div className="w-2/5 grid grid-rows-3 gap-0 justify-center">
                  <p className="font-bold">{products.price} €</p>
                  <input
                    type="number"
                    className="w-10 h-10"
                    min="1"
                    placeholder={item.quantity}
                  />
                  <button>
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="h-6 text-stone-400"
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </>
  )
}

export default Order
