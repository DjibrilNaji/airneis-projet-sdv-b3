// Interactions à voir selon l'utilisation du module de paiement (exemple récup d'un paiement définitf)

import Button from "@/web/components/Button"
import Link from "@/web/components/Link"
import { useEffect } from "react"

export const getServerSideProps = async ({ params }) => {
  const numberOrder = params.orderNumber

  return {
    props: {
      numberOrder: numberOrder,
    },
  }
}

const Confirmation = (props) => {
  const { numberOrder } = props

  useEffect(() => {
    getServerSideProps()
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
          Votre commande a bien été enregistrée sous le numéro {numberOrder}.
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

// seulement pour test puis à enlever car seulement quand l'utilisateur est connecté
Confirmation.isPublic = true

export default Confirmation
