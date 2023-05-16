import { faEnvelopeCircleCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { useEffect, useState } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"

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
      <div className="flex flex-col items-center mt-7 max-w-sm mx-auto text-center p-3 rounded-md bg-stone-100 shadow-md h-full">
        {email ? (
          <>
            <FontAwesomeIcon
              icon={faEnvelopeCircleCheck}
              className="text-7xl text-stone-500"
            />
            <h1 className="text-3xl mt-3">{t("sent")}</h1>
            <p className="mt-7 text-lg" dir={direction}>
              {t("confirmation")}{" "}
              <span className="bg-stone-500 p-1 rounded-md text-white">
                {email}
              </span>
            </p>
          </>
        ) : (
          <>
            <p className="text-xl">
              {t("not_email_return_message")}
              <br />
              <Link
                href={"/contact"}
                className="text-stone-500 font-bold hover:underline"
              >
                {t("contact_us")}
              </Link>
            </p>
          </>
        )}

        <Link
          href={"/"}
          className="my-7 bg-stone-500 text-white px-3 py-2 rounded-md text-sm"
        >
          {t("go_home")}
        </Link>
      </div>
    </>
  )
}

ContactConfirmation.isPublic = true

export default ContactConfirmation
