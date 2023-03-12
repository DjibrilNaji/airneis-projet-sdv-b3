import ContactForm from "@/web/components/ContactForm"
import routes from "@/web/routes"
import axios from "axios"
import { useRouter } from "next/router.js"
import { useCallback } from "react"

const Contact = () => {
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
            Contactez-nous
          </h1>

          <ContactForm onSubmit={handleSubmit} />
        </div>
      </div>
    </>
  )
}

Contact.isPublic = true

export default Contact
