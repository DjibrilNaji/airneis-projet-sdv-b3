import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"

const BackButton = () => {
  const { t } = useTranslation("navigation")
  const router = useRouter()

  return (
    <div className="m-4">
      <button onClick={() => router.back()}>
        <FontAwesomeIcon icon={faArrowLeft} /> {t("go_back")}
      </button>
    </div>
  )
}

export default BackButton
