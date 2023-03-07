// Interactions à voir selon l'utilisation du module de paiement (exemple récup d'un paiement définitf)

import Button from "@/web/components/Button"
import Link from "@/web/components/Link"
// import axios from "axios"

const Confirmation = () => {
  return (
    <>
      <h1 className="flex text-3xl justify-center py-5 font-bold md:justify-center">
        Commande effectuée
      </h1>
      <div>
        <p className="flex justify-center items-center md:w-auto">
          Votre commande a bien été enregistrée sous le numéro XXXXXXX .
        </p>
        <p className="flex justify-center items-center md:w-auto">
          Vous pouvez suivre son état depuis votre espace client.
        </p>
        {/* Message provisoire en attendant le back pour XXXXXXX*/}
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
