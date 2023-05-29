import ContactForm from "@/web/components/ContactForm"
import { useRouter } from "next/router.js"
import { useCallback, useState } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"
import useAppContext from "@/web/hooks/useAppContext"
import FormError from "@/web/components/FormError"

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
      router.push("/contact/confirmation")
    },
    [contact, router]
  )

  return (
    <>
      <div className="w-80 mx-auto">
        <div>
          <h1 className="font-semibold text-2xl text-center uppercase">
            {t("contact_us")}
          </h1>

          {error ? <FormError className="my-4" error={error} /> : ""}

          <ContactForm onSubmit={handleSubmit} />
        </div>
      </div>
    </>
  )
}

Contact.isPublic = true

export default Contact
