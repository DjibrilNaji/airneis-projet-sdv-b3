const Input = (props) => {
  const { type, placeholder, label } = props

  return (
    <div className="mb-6">
      <label>{label}</label>
      <input
        type={type}
        className="w-full px-4 py-2 text-lg font-normal text-gray-700 border border-gray-300 rounded-lg focus:border-stone-500 focus:outline-none shadow-md"
        placeholder={placeholder}
      />
    </div>
  )
}

export default Input
