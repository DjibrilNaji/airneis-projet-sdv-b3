import useAppContext from "@/web/hooks/useAppContext"
import {
  faCheck,
  faCircle,
  faPlus,
  faTimes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const CustomTableBody = (props) => {
  const {
    state: { selectedItems },
    actions: { handleSelectItem, selectedItemToRemove },
  } = useAppContext()

  const {
    data,
    columns,
    getInfo,
    select,
    displayIsDelete,
    fetchSingleItem,
    displayHighlander,
    displayDeleteButton,
    displayStatus,
  } = props

  return (
    <tbody>
      {data?.map((item) => (
        <tr key={item.id} className="border-b text-sm border-gray-300">
          {select && selectedItems && (
            <td className="py-2 px-4">
              <input
                type="checkbox"
                className="h-5 w-5 border-2 appearance-none checked:bg-stone-500 cursor-pointer disabled:cursor-not-allowed"
                disabled={item.isDelete}
                checked={selectedItems && selectedItems.includes(item.id)}
                onChange={() => handleSelectItem(item.id)}
              />
            </td>
          )}
          {columns.map((fieldName) => (
            <td key={fieldName} className="py-2 px-4">
              {fieldName === "userEmail"
                ? item.user.email
                : fieldName === "categoryName"
                ? item.category[0].name
                : fieldName === "materialList"
                ? item.materials.map((mat, index) => (
                    <ul key={index}>
                      <li>{mat.nameMaterial}</li>
                    </ul>
                  ))
                : item[fieldName]}
            </td>
          ))}
          {displayHighlander && (
            <td className="py-2 px-4">
              {item.highlander ? (
                <FontAwesomeIcon
                  icon={faCheck}
                  className="h-6 text-green-500"
                />
              ) : (
                <FontAwesomeIcon icon={faTimes} className="h-6 text-red-500" />
              )}
            </td>
          )}
          {displayIsDelete && (
            <td className="py-2 px-4">
              {item.isDelete ? (
                <FontAwesomeIcon icon={faTimes} className="h-6 text-red-500" />
              ) : (
                <FontAwesomeIcon
                  icon={faCheck}
                  className="h-6 text-green-500"
                />
              )}
            </td>
          )}
          {displayStatus && (
            <td className="py-2 px-4">
              <FontAwesomeIcon
                icon={faCircle}
                className={`text-stone-400 h-5 ${
                  item.status === "Delivered"
                    ? "text-green-400"
                    : item.status === "Cancelled"
                    ? "text-red-400"
                    : "text-orange-400"
                }`}
              />
            </td>
          )}
          {displayDeleteButton && (
            <td className="text-center">
              <button
                className="disabled:opacity-30 disabled:cursor-not-allowed"
                onClick={() => selectedItemToRemove(item.id)}
                disabled={item.isDelete}
              >
                <FontAwesomeIcon
                  icon={faTrash}
                  className="text-stone-400 h-5"
                />
              </button>
            </td>
          )}
          {getInfo && (
            <td className="py-2 px-4 flex">
              <button onClick={() => fetchSingleItem(item.id)}>
                <FontAwesomeIcon
                  icon={faPlus}
                  className="border-2 px-2 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-stone-400"
                />
              </button>
            </td>
          )}
        </tr>
      ))}
    </tbody>
  )
}

export default CustomTableBody
