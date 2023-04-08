import classNames from "classnames"

const TableHeadField = ({ displayName, className, ...otherProps }) => {
  return (
    <th {...otherProps} className={classNames("text-center p-2", className)}>
      {displayName}
    </th>
  )
}

export default TableHeadField
