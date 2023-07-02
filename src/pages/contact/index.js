import ContactForm from "@/web/components/Contact/ContactForm"
import { useRouter } from "next/router.js"
import { useCallback, useState } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"
import useAppContext from "@/web/hooks/useAppContext"
import FormError from "@/web/components/Form/FormError"
import Form from "@/web/components/Form/Form"
import routes from "@/web/routes"

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
  const [error, setError] = useState(null)

  const {
    actions: { contact },
  } = useAppContext()

  const handleSubmit = useCallback(
    async ({ email, subject, message }) => {
      const [err] = await contact({ email, subject, message })

      if (err) {
        setError(err)

        return
      }

      localStorage.setItem("contactEmail", email)
      router.push(routes.contact.confirmation())
    },
    [contact, router]
  )

  return (
    <Form title={t("contact_us")}>
      {error ? <FormError className="my-4" error={error} /> : ""}
      <ContactForm onSubmit={handleSubmit} />
    </Form>
  )
}

Contact.isPublic = true

export default Contact
