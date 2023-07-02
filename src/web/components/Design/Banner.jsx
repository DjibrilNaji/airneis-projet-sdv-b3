const Banner = (props) => {
  const { text } = props

  return (
    <div className="flex justify-center bg-stone-500 my-10">
      <p className="p-6 font-bold text-white text-xl">{text}</p>
    </div>
  )
}

export default Banner
