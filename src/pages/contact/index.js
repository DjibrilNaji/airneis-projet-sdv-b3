import ContactForm from "@/web/components/ContactForm"
import routes from "@/web/routes"
import axios from "axios"
import { useRouter } from "next/router.js"
import { useCallback } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["contact", "navigation"])),
    },
  }
}

const Contact = () => {
  const { t } = useTranslation("contact")
  const router = useRouter()

  const handleSubmit = useCallback(
    async ({ email, subject, message }) => {
      await axios.post(`/api/${routes.api.contact()}`, {
        email,
        subject,
        message,
      })

      localStorage.setItem("contactEmail", email)
      router.push("/contact/confirmation")
    },
    [router]
  )

  return (
    <>
      <div className="w-80 mx-auto">
        <div>
          <h1 className="font-semibold text-2xl text-center uppercase">
            {t("contact_us")}
          </h1>

          <ContactForm onSubmit={handleSubmit} />
        </div>
      </div>
    </>
  )
}

Contact.isPublic = true

export default Contact
