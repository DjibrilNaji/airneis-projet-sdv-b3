import { faArrowDownWideShort } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import classNames from "classnames"

const TableHeadField = ({
  displayName,
  className,
  handleSortChange,
  fieldName,
}) => {
  return (
    <th className={classNames(className)}>
      {displayName}
      <button onClick={() => handleSortChange(fieldName)}>
        <FontAwesomeIcon icon={faArrowDownWideShort} className="ml-1" />
      </button>
    </th>
  )
}

export default TableHeadField
