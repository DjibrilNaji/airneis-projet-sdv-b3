import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import classNames from "classnames"
import Image from "next/image"

const Carousel = (props) => {
  const {
    image,
    activeIndex,
    handleNext,
    handlePrevious,
    className,
    setActiveIndex,
  } = props

  return (
    <>
      <div className={classNames("relative", className)}>
        <div className="m-4 h-96 relative">
          {image.map((image, index) => (
            <Image
              key={image.id}
              src={image.urlImage}
              alt="slide 2"
              className={classNames(
                `w-full h-full object-cover rounded-xl absolute transition-opacity ease-linear duration-300 ${
                  index === activeIndex ? "opacity-100" : "opacity-0"
                } `
              )}
              width="500"
              height="500"
            />
          ))}
        </div>
        <button
          disabled={image.length === 1}
          onClick={handlePrevious}
          className="absolute top-[45%] border-2 opacity-60 hover:opacity-100 bg-white p-2 left-0 rounded-full transition-opacity ease-linear duration-300 disabled:opacity-20"
        >
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="fa-2xl text-stone-500"
          />
        </button>

        <button
          disabled={image.length === 1}
          onClick={handleNext}
          className="absolute top-[45%] border-2 opacity-60 hover:opacity-100 bg-white p-2 right-0 rounded-full transition-opacity ease-linear duration-300 disabled:opacity-20"
        >
          <FontAwesomeIcon
            icon={faArrowRight}
            className="fa-2xl text-stone-500"
          />
        </button>
        <div className="flex justify-center">
          {image.map((image, index) => (
            <button
              onClick={() => setActiveIndex(index)}
              key={image.id}
              className={`rounded-full h-2 w-8 mt-2 mx-2 ${
                index === activeIndex
                  ? "bg-stone-500"
                  : "bg-stone-200 hover:bg-stone-900"
              }`}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default Carousel
