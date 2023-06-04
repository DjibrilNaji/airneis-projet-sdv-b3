import LayoutAdmin from "@/web/components/Admin/LayoutAdmin/LayoutAdmin"
import BackButton from "@/web/components/BackButton"
import FormError from "@/web/components/FormError"
import useAppContext, { AppContextProvider } from "@/web/hooks/useAppContext"
import routes from "@/web/routes"
import { faEye } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

export const getServerSideProps = async ({ params }) => {
  const orderId = params.orderId

  return {
    props: {
      orderId,
    },
  }
}

const ViewUser = (props) => {
  const { orderId } = props
  const {
    actions: { getSingleOrder },
  } = useAppContext()

  const [error, setError] = useState(null)
  const [order, setOrder] = useState([])
  const [products, setProducts] = useState([])
  const [address, setAddress] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const [err, data] = await getSingleOrder(orderId)

      if (err) {
        setError(err)

        return
      }

      setOrder(data.order)
      setProducts(data.products)
      setAddress(data.order.address[0])
    }
    fetchData()
  }, [getSingleOrder, orderId])

  const creationDate = new Date(order.createdAt).toLocaleDateString("fr")

  return (
    <div>
      {error ? <FormError error={error} /> : ""}

      <BackButton />
      <div className="flex flex-col gap-6">
        <span className="font-bold text-lg mx-4">
          Numéro de commande :
          <i className="text-md font-normal"> {order.numberOrder}</i>
        </span>

        <div className="flex flex-row gap-4 mx-4 font-bold text-lg">
          View user here :
          <Link href={`/admin/users/${order.userId}/view`}>
            <FontAwesomeIcon icon={faEye} />
          </Link>
        </div>

        <div className="mx-4 border-2 rounded-lg">
          <div className="flex justify-between items-center bg-gray-300 p-4 rounded-t-lg">
            <span className="font-bold text-lg">Récapitulatif</span>
            <i>(Status : {order.status})</i>
          </div>

          <div className="flex flex-col gap-10 md:flex-row md:justify-between p-4">
            <div className="flex flex-col">
              Commandé le {creationDate}
              <span className="font-bold mt-4">
                Phone number :{" "}
                <span className="font-normal">{address.phoneNumber}</span>
              </span>
              <span className="font-bold mt-4">Adresse de livraison</span>
              <span>
                {address.firstName} {address.lastName}
              </span>
              <span>{address.addressFull}</span>
              <span>
                {address.city}, {address.cp}
              </span>
              <span>{address.country}</span>
            </div>

            <div className="flex flex-col gap-1">
              <div className="font-bold">Recapitualif commande</div>
              <span className="flex justify-between">
                Montant HT :{" "}
                <span>{(order.price - order.amount_tva).toFixed(2)} €</span>
              </span>
              <span className="flex justify-between">
                TVA : <span>{order.amount_tva} €</span>
              </span>
              <span className="flex justify-between font-bold gap-4 text-xl">
                Total : <span> {order.total_price} €</span>
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col p-4 w-screen rounded-lg">
          <div className="bg-gray-300 p-4 font-bold text-lg rounded-t-lg">
            {products.length} products
          </div>

          <div className="border-2 rounded-b-lg">
            {products.map((item) => (
              <div
                key={item.productId}
                className="flex flex-col p-4 gap-4 border-b border-2 md:flex-row items-center"
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

                  <p className="truncate-3 w-[80%]">
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
      </div>
    </div>
  )
}

ViewUser.getLayout = function (page) {
  return (
    <AppContextProvider>
      <LayoutAdmin>{page}</LayoutAdmin>
    </AppContextProvider>
  )
}

export default ViewUser
