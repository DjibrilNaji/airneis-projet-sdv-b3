import { faEnvelopeCircleCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { useEffect, useState } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  }
}

const ContactConfirmation = () => {
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
            <h1 className="text-3xl mt-3">Envoyé ! </h1>
            <p className="mt-7 text-lg">
              Votre message a bien été envoyé avec l'adresse{" "}
              <span className="bg-stone-500 p-1 rounded-md text-white">
                {email}
              </span>
            </p>
          </>
        ) : (
          <>
            <p className="text-xl">
              Si vous voulez nous contactez, retournez sur la page de contact
              juste ici
              <Link
                href={"/contact"}
                className="text-stone-500 font-bold hover:underline"
              >
                {" "}
                Contactez-nous
              </Link>
            </p>
          </>
        )}

        <Link
          href={"/"}
          className="my-7 bg-stone-500 text-white px-3 py-2 rounded-md text-sm"
        >
          Go Home
        </Link>
      </div>
    </>
  )
}

ContactConfirmation.isPublic = true

export default ContactConfirmation
