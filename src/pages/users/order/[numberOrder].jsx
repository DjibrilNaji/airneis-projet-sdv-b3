import Image from "next/image"
import { useCallback, useState } from "react"
import Button from "@/web/components/Button"
import useAppContext from "@/web/hooks/useAppContext.jsx"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import FormError from "@/web/components/FormError"
import cookie from "cookie"
import createAPIClient from "@/web/createAPIClient"
import getOrderDetailService from "@/web/services/order/getOrderDetail"

export const getServerSideProps = async ({ locale, params, req }) => {
  const numberOrder = params.numberOrder

  const { jwt } = cookie.parse(req ? req.headers.cookie || "" : document.cookie)

  const api = createAPIClient({ jwt, server: true })
  const getOrderDetail = getOrderDetailService({ api })
  const [err, data] = await getOrderDetail(numberOrder)

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
      order: data,
      numberOrder: numberOrder,
      ...(await serverSideTranslations(locale, ["common", "navigation"])),
    },
  }
}

const Order = (props) => {
  const {
    order: { result },
    numberOrder,
  } = props

  const {
    actions: { cancelOrder },
  } = useAppContext()

  const [error, setError] = useState(null)
  const [status, setStatus] = useState(result.order[0].status)

  const handleCancelOrder = useCallback(() => {
    async function fetchDataCancel() {
      const [err, data] = await cancelOrder(numberOrder)

      if (err) {
        setError(err)

        return
      }

      setStatus(Object.values(data.result).map((tempo) => tempo.status))
    }
    fetchDataCancel()
  }, [cancelOrder, numberOrder])

  return (
    <>
      {error ? (
        <FormError error={error} />
      ) : (
        <>
          <div className="h-40 flex items-center self-center justify-center">
            <span className="pl-10 md:pl-0 text-black uppercase font-bold text-2xl">
              Order #{result.order[0].numberOrder} -{" "}
              {new Date(result.order[0].createdAt).toLocaleDateString("fr")} -{" "}
              {status}
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
                    <p className="font-bold text-sm md:text-xl">
                      {product.name}
                    </p>
                    <p className="text-xs md:text-sm lg:text-lg">
                      {product.description}
                    </p>
                  </div>
                  <div className="w-1/5 lg:pl-8">
                    <p className="flex place-content-center font-bold text-sm md:text-base">
                      {product.price} €
                    </p>
                    <div className="flex place-content-center">
                      <p className="w-6 h-6 text-sm md:w-16 md:h-10 md:text-base text-center">
                        {" "}
                        {product.quantity}{" "}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="order-2 md:pl-10 md:pr-10">
              <div className="flex border-solid border-black border-b-4 pb-4">
                <div>
                  <p className="font-bold text-2xl md:text-xl pr-5">Amount :</p>
                  <p className="font-bold text-gray-400 text-lg md:text-base pr-5">
                    TVA :
                  </p>
                </div>
                <div className="grow">
                  <p className="font-bold text-2xl md:text-xl text-end">
                    {result.order[0].price} €
                  </p>
                  <p className="font-bold text-gray-400 text-lg md:text-base text-end">
                    {result.order[0].amount_tva} €
                  </p>
                </div>
              </div>
              <div className="pt-4 border-solid border-black border-b-4 pb-4">
                <p className="font-bold text-2xl md:text-xl pr-5">
                  Delivery address
                </p>
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
                <p className="font-bold text-2xl md:text-xl pr-5">
                  Billing address
                </p>
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
                <p className="font-bold text-2xl pr-5 md:text-xl">
                  Method of payment
                </p>
              </div>
              <div
                className="pt-4"
                hidden={status !== "On standby" ? true : false}
              >
                <Button onClick={handleCancelOrder}>Cancelled Order</Button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Order
