const ModalButtonInfo = (props) => {
  const { title, onClick, selectedType, type } = props

  return (
    <button
      onClick={onClick}
      className={`flex ${
        selectedType.name === type.name && "font-bold underline"
      }`}
    >
      {title}
    </button>
  )
}

export default ModalButtonInfo
