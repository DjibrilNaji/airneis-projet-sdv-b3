import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import classNames from "classnames"
import Link from "next/link"
import TableHeadField from "../TableHeadField"

const TableAddress = (props) => {
  const { address, className } = props

  return (
    <table className={classNames("w-full", className)}>
      <thead className="text-xs text-left uppercase bg-gray-50 text-gray-700">
        <tr>
          <th className="py-2 px-4">Select</th>
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
          <th className="py-2 px-4">More</th>
        </tr>
      </thead>

      <tbody>
        {address.map((add) => (
          <>
            <tr key={add.id} className="border-b text-sm border-gray-300">
              <td className="py-2 px-4">
                <input
                  type="checkbox"
                  className="h-5 w-5 border-2 appearance-none checked:bg-stone-500 cursor-pointer"
                />
              </td>
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
                {add.addressOptionnal}
              </td>
              <td className="py-2 px-4 flex justify-center">
                <Link
                  href={""}
                  className="border-2 px-2 py-1 rounded-full bg-gray-100 hover:bg-gray-200"
                >
                  <FontAwesomeIcon icon={faPlus} className="text-stone-400" />
                </Link>
              </td>
            </tr>
          </>
        ))}
      </tbody>
    </table>
  )
}

export default TableAddress
