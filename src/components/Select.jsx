import Options from "./Options"
import classNames from "classnames"

const Select = (props) => {
  const { options, className } = props

  return (
    <div className="mb-6">
      <select
        className={classNames(
          "w-full px-4 py-2 text-lg font-normal bg-[#FFFFFF] text-gray-700 border border-gray-300 rounded-lg focus:border-stone-500 focus:outline-none shadow-md",
          className
        )}
      >
        {options.map((name) => (
          <Options label={name} />
        ))}
      </select>
    </div>
  )
}

export default Select
