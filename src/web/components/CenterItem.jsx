import routes from "@/web/routes"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import classNames from "classnames"
import Link from "next/link"

const CenterItem = (props) => {
  const { icon, content, button, className } = props

  return (
    <div className={classNames("fixed inset-0", className)}>
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-10 bg-white rounded-lg">
          <div className="flex flex-col items-center gap-10">
            {icon && (
              <FontAwesomeIcon icon={icon} className="h-20 text-stone-500" />
            )}
            <p className="text-xl font-bold">{content}</p>
          </div>
          {button && (
            <Link
              href={routes.home()}
              className="bg-stone-500 px-4 text-xl py-2 rounded-md text-white"
            >
              {button}
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default CenterItem
