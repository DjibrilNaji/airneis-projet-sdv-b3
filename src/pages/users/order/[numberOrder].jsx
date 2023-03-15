import axios from "axios"
import routes from "@/web/routes"
import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"

export const getServerSideProps =  async ({ params, req: { url } }) => {
  const numberOrder = params.numberOrder

  const query = Object.fromEntries(
    new URL(`http://example.com/${url}`).searchParams.entries()
  )

  const { data } = await axios.get(
    `http://localhost:3000/api${routes.api.orders.single(numberOrder, query)}`
  )

  return {
    props: {
      order: data,
    },
  }
}

const Order = (props) => {
  const {
    order: { result}
  } = props

  return (
    <>
      {result.order.map((order, index) => (
        <div key={index}>
          <div className="h-40 flex items-center self-center justify-center">
            <span className="pl-10 md:pl-0 text-black uppercase font-bold text-2xl">
              Order #{order.numberOrder} -{" "}
              {new Date(order.createdAt).toLocaleDateString("fr")} -{" "}
              {order.status}
            </span>
          </div>
          <div className="grid px-2 gap-7 grid-cols-1 md:pb-10 md:grid-cols-2">
            <div className="order-1">
              {result.allProductsOrder.map((product) => (
                <div key={product.id} className="flex pb-8 lg:pl-10">
                  <Image
                    src={product.urlImage}
                    alt="slide 1"
                    className="h-32 w-32 lg:h-72 lg:w-64"
                    width="500"
                    height="500"
                  />
                  <div className="w-3/5 pl-2 md:pl-3">
                    <p className="font-bold text-sm md:text-xl">{product.name}</p>
                    <p className="text-xs md:text-sm lg:text-lg">{product.description}</p>
                  </div>
                  <div className="w-1/5 lg:pl-8">
                    <p className="flex place-content-center font-bold text-sm md:text-base">
                      {product.price.toFixed(2)} €
                    </p>
                    <div className="flex place-content-center">
                      <input
                        type="number"
                        className="w-6 h-6 text-sm md:w-16 md:h-10 md:text-base text-center"
                        min="1"
                        disabled={order.status !== "On standby" ? true : false}
                        placeholder={product.quantity}
                      />
                    </div>
                    <div className="flex place-content-center">
                      <button hidden={order.status !== "On standby" ? true : false}>
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
            <div className="order-2 md:pl-10 md:pr-10">
              <div className="flex border-solid border-black border-b-4 pb-4">
                <div>
                  <p className="font-bold text-2xl md:text-xl pr-5">Amount : </p>
                  <p className="font-bold text-gray-400 text-lg md:text-base pr-5">TVA : </p>
                </div>
                <div className="grow">
                  <p className="font-bold text-2xl md:text-xl text-end">{order.sum.toFixed(2)} €</p>
                  <p className="font-bold text-gray-400 text-lg md:text-base text-end">
                    {order.sum * 0.2}
                  </p>
                </div>
              </div>
              <div className="pt-4 border-solid border-black border-b-4 pb-4">
                <p className="font-bold text-2xl md:text-xl pr-5">Delivery address</p>
                {result.userDeliveryAddress.map((delAdd, index) => (
                  <div key={index}>
                    <p className="text-xl md:text-lg">
                      {delAdd.firstName} {delAdd.lastName}
                    </p>
                    <p className="text-xl md:text-lg">{delAdd.addressFull}</p>
                    <p className="text-xl md:text-lg">
                      {delAdd.cp} {delAdd.city}
                    </p>
                    <p className="text-xl md:text-lg">{delAdd.country}</p>
                    <p className="text-xl md:text-lg">{delAdd.phoneNumber}</p>
                  </div>
                ))}
              </div>
              <div className="pt-4 border-solid border-black border-b-4 pb-4">
                <p className="font-bold text-2xl md:text-xl pr-5">Billing address</p>
                {result.userBillingAddress.map((bilAdd, index) => (
                  <div key={index}>
                    <p className="text-xl md:text-lg">
                      {bilAdd.firstName} {bilAdd.lastName}
                    </p>
                    <p className="text-xl md:text-lg">{bilAdd.addressFull}</p>
                    <p className="text-xl md:text-lg">
                      {bilAdd.cp} {bilAdd.city}
                    </p>
                    <p className="text-xl md:text-lg">{bilAdd.country}</p>
                    <p className="text-xl md:text-lg">{bilAdd.phoneNumber}</p>
                  </div>
                ))}
              </div>
              <div className="pt-4">
                <p className="font-bold text-2xl pr-5 md:text-xl">Method of payment</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default Order
