// Interactions à voir selon l'utilisation du module de paiement (exemple récup d'un paiement définitf)

import Button from "@/web/components/Button"
import Link from "@/web/components/Link"
import { useEffect, useState } from "react"
import axios from "axios"

export const getServerSideProps = ({ params }) => ({
  props: {
    params: {
      trackingNumber: params.trackingNumber,
    },
  },
})

const Confirmation = (props) => {
  const [OrderNumber, setOrderNumber] = useState([])

  const {
    params: { trackingNumber },
  } = props

  const OrderStatus = async () => {
    getServerSideProps({ params: `localhost:3000/users/order/` })
    const result = await axios.get("/api/orders")

    if (result.data.map((order) => order.status) === "paid") {
      setOrderNumber(
        result.data.find((order) => order.trackingNumber === trackingNumber)
          .trackingNumber
      )
    }

    console.log(
      "Command number",
      result.data.find((order) => order.trackingNumber === trackingNumber)
        .trackingNumber
    )
  }

  useEffect(() => {
    OrderStatus()
  })
  //Pour l'affichage comme ça vient après le paiement faut voir comment l'API de paiement intergait avec la BDD pour changer le statut de la commande
  //cette fonction est à faire également dans la page BDD

  return (
    <>
      <h1 className="flex text-3xl justify-center py-5 font-bold md:justify-center">
        Commande effectuée
      </h1>
      <div>
        <p className="flex justify-center items-center md:w-auto">
          Votre commande a bien été enregistrée sous le numéro {OrderNumber}.
        </p>
        <p className="flex justify-center items-center md:w-auto">
          Vous pouvez suivre son état depuis votre espace client.
        </p>
        <div className="flex justify-center py-7 md:justify-center items-center">
          <Link href="/cart">
            <Button>Continuer mes achats</Button>
          </Link>
        </div>
      </div>
    </>
  )
}

Confirmation.isPublic = true

export default Confirmation
