import routes from "@/web/routes"
import {
  faCheck,
  faPencil,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import classNames from "classnames"
import Link from "next/link"
import Button from "../Button/Button"
import TableHeadField from "../TableHeadField"

const TableAddress = (props) => {
  const { address, className, onClick } = props

  return (
    <table className={classNames("w-full", className)}>
      <thead className="text-xs text-left uppercase bg-gray-50 text-gray-700">
        <tr>
          <TableHeadField displayName="ID" />
          <TableHeadField displayName="First name" />
          <TableHeadField displayName="Last name" />
          <TableHeadField displayName="Address Full" />
          <TableHeadField displayName="City" />
          <TableHeadField
            displayName="Postal Code"
            className="hidden md:table-cell"
          />
          <TableHeadField
            displayName="Country"
            className="hidden md:table-cell"
          />
          <TableHeadField
            displayName="Phone Number"
            className="hidden md:table-cell"
          />
          <TableHeadField
            displayName="Adress Optionnal"
            className="hidden md:table-cell"
          />
          <TableHeadField
            displayName="Adress Default"
            className="hidden md:table-cell"
          />
          <th colSpan={2} className="py-2 px-4">
            Update / Delete
          </th>
        </tr>
      </thead>

      <tbody>
        {address.map((add) => (
          <tr key={add.id} className="border-b text-sm border-gray-300">
            <td className="py-2 px-4">{add.id} </td>
            <td className="py-2 px-4">{add.firstName}</td>
            <td className="py-2 px-4">{add.lastName}</td>
            <td className="py-2 px-4">{add.addressFull}</td>
            <td className="py-2 px-4">{add.city}</td>
            <td className="py-2 px-4 hidden md:table-cell">{add.cp}</td>
            <td className="py-2 px-4 hidden md:table-cell">{add.country}</td>
            <td className="py-2 px-4 hidden md:table-cell">
              {add.phoneNumber}
            </td>
            <td className="py-2 px-4 hidden md:table-cell">
              {add.addressOptional}
            </td>
            <td className="py-2 px-4">
              {!add.address_default ? (
                <FontAwesomeIcon icon={faXmark} className="h-6 text-red-500" />
              ) : (
                <FontAwesomeIcon
                  icon={faCheck}
                  className="h-6 text-green-500"
                />
              )}
            </td>
            <td className="py-2 px-4">
              <Link
                href={routes.users.addressSingle(add.id)}
                className="border-2 px-2 py-1 rounded-full flex justify-center bg-gray-100 hover:bg-gray-200"
              >
                <FontAwesomeIcon icon={faPencil} className="text-stone-400" />
              </Link>
            </td>
            <td
              className="py-2 px-4"
              hidden={add.address_default === true ? true : false}
            >
              <Button
                variant="third"
                color="gray"
                size="normal"
                data-id={add.id}
                onClick={onClick}
              >
                <FontAwesomeIcon icon={faTrash} className="text-stone-400" />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TableAddress
