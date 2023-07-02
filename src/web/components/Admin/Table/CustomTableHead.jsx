import TableHeadField from "@/web/components/Admin/Table/TableHeadField"
import useAppContext from "@/web/hooks/useAppContext"

const CustomTableHead = ({ columns }) => {
  const {
    actions: { handleSortChange },
  } = useAppContext()

  return (
    <thead className="text-xs text-left uppercase bg-gray-50 text-gray-700">
      <tr>
        {columns.map((column, index) => (
          <TableHeadField
            key={index}
            displayName={column.displayName}
            handleSortDisplay={column.handleSort}
            handleSortChange={handleSortChange}
            fieldName={column.fieldName}
          />
        ))}
      </tr>
    </thead>
  )
}

export default CustomTableHead
