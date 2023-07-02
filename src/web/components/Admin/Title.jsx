const Title = (props) => {
  const { title } = props

  return (
    <div className="flex item-center justify-center mb-5">
      <span className="font-extrabold text-3xl text-stone-500 uppercase">
        {title}
      </span>
    </div>
  )
}

export default Title
