import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRouter } from "next/router"

const BackButton = () => {
  const router = useRouter()

  return (
    <div className="m-4">
      <button onClick={() => router.back()}>
        <FontAwesomeIcon icon={faArrowLeft} /> Retour
      </button>
    </div>
  )
}

export default BackButton
