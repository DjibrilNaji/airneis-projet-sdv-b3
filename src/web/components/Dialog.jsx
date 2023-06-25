const Dialog = (props) => {
  const { isOpen, dialogTitle, content, dir } = props

  return (
    <div
      className={`fixed px-4 py-6 top-1/2 left-1/2 w-2/3 md:w-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-black opacity-90 rounded-lg ${
        isOpen ? "" : "hidden"
      }`}
      dir={dir}
    >
      <h1 className="text-white text-lg md:text-xl font-bold underline pb-2">
        {dialogTitle}
      </h1>
      <p className="flex text-white text-lg md:text-xl">{content}</p>
    </div>
  )
}

export default Dialog
