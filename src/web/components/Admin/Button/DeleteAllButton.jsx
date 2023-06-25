import classNames from "classnames"

const DeleteAllButton = (props) => {
  const { onClick, disabled, title, className } = props

  return (
    <button
      className={classNames(
        "border-2 rounded-lg my-4 p-2 bg-red-500 text-white disabled:cursor-not-allowed disabled:bg-red-200",
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  )
}

export default DeleteAllButton
