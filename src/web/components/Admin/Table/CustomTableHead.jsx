import TableHeadField from "@/web/components/Admin/Table/TableHeadField"

const CustomTableHead = ({ handleSortChange, columns }) => {
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
