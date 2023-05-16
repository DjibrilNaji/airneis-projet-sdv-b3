import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons"
import Link from "next/link"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"

const Footer = () => {
  const { t } = useTranslation("navigation")
  const { locale } = useRouter()
  const direction = t("direction", { locale })

  return (
    <>
      <footer
        className="hidden md:flex items-center static  bottom-0 w-full bg-white border-t-2 border-stone-400 shadow-md p-4 justify-between"
        dir={direction}
      >
        <div>
          <Link href={`/`} legacyBehavior>
            <a className="pr-3 text-stone-400 text-lg font-bold">
              {t("menu_conditions")}
            </a>
          </Link>
          <Link href={`/`} legacyBehavior>
            <a className="px-3 text-stone-400 text-lg font-bold">
              {t("menu_privacy")}
            </a>
          </Link>
          <Link href={`/contact`} legacyBehavior>
            <a className="px-3 text-stone-400 text-lg font-bold">
              {t("menu_contact")}
            </a>
          </Link>
        </div>

        <div>
          <Link href={`/`} className="pr-3">
            <FontAwesomeIcon
              icon={faLinkedinIn}
              className="h-5 text-stone-400"
            />
          </Link>
          <Link href={`/`} className="pr-3">
            <FontAwesomeIcon
              icon={faInstagram}
              className="h-5 text-stone-400"
            />
          </Link>
          <Link href={`/`} className="pr-3">
            <FontAwesomeIcon
              icon={faFacebookF}
              className="h-5 text-stone-400"
            />
          </Link>
        </div>
      </footer>
    </>
  )
}

Footer.isPublic = true

export default Footer
