import routes from "@/web/routes"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"

const EmptyPage = (props) => {
  const { icon, content, button } = props

  return (
    <div className="fixed inset-0">
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-10 bg-white rounded-lg">
          <div className="flex flex-col items-center gap-10">
            <FontAwesomeIcon icon={icon} className="h-20 text-stone-500" />
            <p className="font-bold">{content}</p>
          </div>
          <Link
            href={routes.home()}
            className="bg-stone-500 px-4 text-xl py-2 rounded-md text-white"
          >
            {button}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default EmptyPage
