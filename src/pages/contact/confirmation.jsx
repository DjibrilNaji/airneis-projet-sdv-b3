import { useEffect, useState } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"
import MessageConfirmation from "@/web/components/Contact/MessageConfirmation"
import routes from "@/web/routes"

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["contact", "navigation"])),
    },
  }
}

const ContactConfirmation = () => {
  const { t } = useTranslation("contact")
  const { locale } = useRouter()
  const direction = t("direction", { locale })

  const [email, setEmail] = useState()

  useEffect(() => {
    const storedEmail = localStorage.getItem("contactEmail")

    if (storedEmail) {
      setEmail(storedEmail)
      localStorage.removeItem("contactEmail")
    }
  }, [])

  return (
    <>
      {email ? (
        <MessageConfirmation
          dir={direction}
          title={t("sent")}
          message={t("confirmation")}
          info={email}
          route={routes.home()}
          button={t("go_home")}
        />
      ) : (
        <MessageConfirmation
          dir={direction}
          message={t("not_email_return_message")}
          route={routes.contact.contact()}
          button={t("contact_us")}
        />
      )}
    </>
  )
}

ContactConfirmation.isPublic = true

export default ContactConfirmation
