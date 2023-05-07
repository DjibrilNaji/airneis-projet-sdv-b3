import Button from "@/web/components/Button"
import Link from "@/web/components/Link"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

export const getServerSideProps = async ({ locale, params }) => {
  const numberOrder = params.orderNumber

  return {
    props: {
      numberOrder: numberOrder,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  }
}

const Confirmation = (props) => {
  const { numberOrder } = props

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

export default Confirmation
