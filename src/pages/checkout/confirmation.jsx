import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useEffect } from "react"
import routes from "@/web/routes"
import { useTranslation } from "next-i18next"
import MessageConfirmation from "@/web/components/Contact/MessageConfirmation"
import { useRouter } from "next/router"

export const getServerSideProps = async ({ locale, query }) => {
  const numberOrder = query.payment_intent.slice(3)

  return {
    props: {
      numberOrder,
      ...(await serverSideTranslations(locale, [
        "navigation",
        "confirmation-checkout",
      ])),
    },
  }
}

const Confirmation = (props) => {
  const { numberOrder } = props

  const { t } = useTranslation("confirmation-checkout")
  const { locale } = useRouter()
  const direction = t("direction", { locale })

  useEffect(() => {
    const date = new Date()
    date.setDate(date.getDate() - 100)
    document.cookie = `addressId=; expires=${date}; path=/;`
  }, [])

  return (
    <MessageConfirmation
      title={t("title")}
      message={t("confirmation")}
      info={numberOrder}
      route={routes.home()}
      button={t("go_home")}
      dir={direction}
    />
  )
}

export default Confirmation
