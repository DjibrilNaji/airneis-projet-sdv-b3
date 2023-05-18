import Image from "next/image"
import debounce from "@/debounce.js"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { useCallback, useEffect, useMemo, useState } from "react"
import Button from "@/web/components/Button"
import useAppContext from "@/web/hooks/useAppContext.jsx"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import FormError from "@/web/components/FormError"

export const getServerSideProps = async ({ locale, params, req: { url } }) => {
  const numberOrder = params.numberOrder

  const query = Object.fromEntries(
    new URL(`http://example.com/${url}`).searchParams.entries()
  )

  return {
    props: {
      numberOrder: numberOrder,
      query: query,
      ...(await serverSideTranslations(locale, ["common", "navigation"])),
    },
  }
}

const Order = (props) => {
  const { numberOrder, query } = props

  const {
    actions: {
      patchOrderQuantity,
      deleteProductOrder,
      cancelOrder,
      getOrderDetail,
    },
  } = useAppContext()

  useEffect(() => {
    const fetchData = async () => {
      const [err, data] = await getOrderDetail(numberOrder)

      if (err) {
        setError(err)

        return
      }

      setOrder(data.result.order[0])
      setProducts(data.result.allProductsOrder)
      setBillingAddress(data.result.userBillingAddress)
      setDeliveryAddress(data.result.userDeliveryAddress)
      setStatus(data.result.order[0].status)
      setTotal(data.result.order[0].price_formatted)
      setTotalTva(data.result.order[0].amount_tva_formatted)
    }
    fetchData()
  }, [getOrderDetail, numberOrder])

  const [order, setOrder] = useState([])
  const [allProducts, setProducts] = useState([])
  const [deliveryAddress, setDeliveryAddress] = useState([])
  const [billingAddress, setBillingAddress] = useState([])
  const [error, setError] = useState(null)
  const [status, setStatus] = useState()
  const [total, setTotal] = useState()
  const [totalTva, setTotalTva] = useState()

  const debouncedFetchData = useMemo(
    () =>
      debounce((productId, quantity) => {
        async function fetchData(productId, quantity) {
          const [err, data] = await patchOrderQuantity(
            numberOrder,
            productId,
            quantity
          )

          if (err) {
            setError(err)

            return
          }

          setTotal(
            Object.values(data.result).map((tempo) => tempo.price_formatted)
          )
          setTotalTva(
            Object.values(data.result).map(
              (tempo) => tempo.amount_tva_formatted
            )
          )
        }

        fetchData(productId, quantity)
      }),
    [numberOrder, patchOrderQuantity]
  )

  const handleDeleteClick = useCallback(
    (event) => {
      async function fetchDataDelete(productId) {
        const [err, data] = await deleteProductOrder(
          numberOrder,
          productId,
          query
        )

        if (err) {
          setError(err)

          return
        }

        setProducts(
          allProducts.filter((product) => product.id !== parseInt(productId))
        )
        Object.values(data.result).map((tempo) => setStatus(tempo.status))
        setTotal(
          Object.values(data.result).map((tempo) => tempo.price_formatted)
        )
        setTotalTva(
          Object.values(data.result).map((tempo) => tempo.amount_tva_formatted)
        )
      }
      const productId = event.currentTarget.dataset.id
      fetchDataDelete(productId)
    },
    [allProducts, deleteProductOrder, numberOrder, query]
  )

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

  const handleChangeQuantity = useCallback(
    (event) => {
      if (event.target.value === "") {
        event.target.value = 1
      }

      debouncedFetchData(
        parseInt(event.currentTarget.dataset.id),
        parseInt(event.target.value)
      )
    },
    [debouncedFetchData]
  )

  return (
    <>
      {error ? (
        <FormError error={error} />
      ) : (
        <>
          <div className="h-40 flex items-center self-center justify-center">
            <span className="pl-10 md:pl-0 text-black uppercase font-bold text-2xl">
              Order #{order.numberOrder} -{" "}
              {new Date(order.createdAt).toLocaleDateString("fr")} - {status}
            </span>
          </div>
          <div className="grid px-2 gap-7 grid-cols-1 md:pb-10 md:grid-cols-2">
            <div className="order-1">
              {allProducts.map((product) => (
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
                      {product.price_formatted}
                    </p>
                    <div className="flex place-content-center">
                      <input
                        type="number"
                        className="w-6 h-6 text-sm md:w-16 md:h-10 md:text-base text-center"
                        min={1}
                        max={product.stock}
                        data-id={product.id}
                        disabled={status !== "On standby" ? true : false}
                        onChange={handleChangeQuantity}
                        placeholder={product.quantity}
                      />
                    </div>
                    <div className="flex place-content-center">
                      <button
                        hidden={status !== "On standby" ? true : false}
                        data-id={product.id}
                        onClick={handleDeleteClick}
                      >
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
                  <p className="font-bold text-2xl md:text-xl pr-5">
                    Amount :{" "}
                  </p>
                  <p className="font-bold text-gray-400 text-lg md:text-base pr-5">
                    TVA :{" "}
                  </p>
                </div>
                <div className="grow">
                  <p className="font-bold text-2xl md:text-xl text-end">
                    {total}
                  </p>
                  <p className="font-bold text-gray-400 text-lg md:text-base text-end">
                    {totalTva}
                  </p>
                </div>
              </div>
              <div className="pt-4 border-solid border-black border-b-4 pb-4">
                <p className="font-bold text-2xl md:text-xl pr-5">
                  Delivery address
                </p>
                {deliveryAddress.map((delAdd, index) => (
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
                {billingAddress.map((bilAdd, index) => (
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
