import classNames from "classnames"

const TableHeadField = ({ displayName, className }) => {
  return <th className={classNames(className)}>{displayName}</th>
}

export default TableHeadField
