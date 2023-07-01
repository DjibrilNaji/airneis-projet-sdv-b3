import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useEffect } from "react"
import routes from "@/web/routes"
import Link from "next/link"

export const getServerSideProps = async ({ locale, query }) => {
  const numberOrder = query.payment_intent.slice(3)

  return {
    props: {
      numberOrder,
      ...(await serverSideTranslations(locale, ["common", "navigation"])),
    },
  }
}

const Confirmation = (props) => {
  const { numberOrder } = props

  const { t } = useTranslation("navigation")

  useEffect(() => {
    const date = new Date()
    date.setDate(date.getDate() - 100)
    document.cookie = `addressId=; expires=${date}; path=/;`
  }, [])

  return (
    <>
      <div className="fixed inset-0">
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex flex-col items-center gap-10 bg-white rounded-lg">
            <h1 className="flex text-3xl justify-center py-5 font-bold">
              Commande effectuée
            </h1>

            <p className="flex justify-center items-center md:w-auto">
              Votre commande a bien été enregistrée sous le numéro :
            </p>

            <span className="font-bold italic bg-stone-300 px-2">
              {numberOrder}
            </span>

            <Link
              href={routes.home()}
              className="bg-stone-500 px-4 text-xl py-2 rounded-md text-white"
              title={t("cart")}
            >
              Continuer mes achats
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Confirmation
