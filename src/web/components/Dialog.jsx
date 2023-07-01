const Dialog = (props) => {
  const { isOpen, content, dir } = props

  return (
    <div
      className={`fixed top-24 right-2 w-fit bg-green-500 text-white p-2 rounded z-50 transition-all duration-300 ease-in-out transform ${
        isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
      dir={dir}
    >
      <p className="flex text-white">{content}</p>
    </div>
  )
}

export default Dialog
