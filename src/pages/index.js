import axios from "axios"
import routes from "@/web/routes.js"
import Image from "next/image"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"

export const getServerSideProps = async ({ req: { url } }) => {
  const query = Object.fromEntries(
    new URL(`http://example.com/${url}`).searchParams.entries()
  )

  const { data } = await axios.get(
    `http://localhost:3000/api${routes.api.categoriesAndProducts.collection(
      query
    )}`
  )

  return {
    props: {
      categoriesAndProducts: data,
    },
  }
}

const Home = (props) => {
  const {
    categoriesAndProducts: { result },
  } = props

  const [activeIndex, setActiveIndex] = useState(0)

  const handlePrevious = () => {
    setActiveIndex(
      (prevActiveIndex) =>
        (prevActiveIndex - 1 + result.imageHomePage.length) %
        result.imageHomePage.length
    )
  }

  const handleNext = () => {
    setActiveIndex(
      (prevActiveIndex) => (prevActiveIndex + 1) % result.imageHomePage.length
    )
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex(
        (prevActiveIndex) => (prevActiveIndex + 1) % result.imageHomePage.length
      )
    }, 8000)

    return () => {
      clearInterval(intervalId)
    }
  }, [result.imageHomePage.length])

  return (
    <>
      <div>
        <div className="relative">
          <div className="m-4 h-96 relative">
            {result.imageHomePage.map((image, index) => (
              <Image
                key={image.id}
                src={image.urlImage}
                alt="slide 2"
                className={`w-full h-full object-cover rounded-xl absolute ${
                  index === activeIndex ? "opacity-100" : "opacity-0"
                } transition-opacity ease-linear duration-300`}
                width="500"
                height="500"
              />
            ))}
          </div>
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="absolute top-[45%] fa-2xl border-2 bg-white p-2 left-0 rounded-full text-stone-500"
            onClick={handlePrevious}
          />
          <FontAwesomeIcon
            icon={faArrowRight}
            className="absolute top-[45%] fa-2xl border-2 bg-white p-2 right-0 rounded-full text-stone-500"
            onClick={handleNext}
          />
        </div>

        <div className="flex justify-center">
          {result.imageHomePage.map((image, index) => (
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
      <div className="flex justify-center my-4">
        <p className="p-6 text-center font-bold text-stone-400 text-xl">
          Venant des hautes terres d'écosse <br />
          nos meubles sont immortels
        </p>
      </div>

      <div className="grid gap-12 md:grid-cols-2 md:gap-8 md:px-4 lg:grid-cols-3">
        {result.categories.map((category) => (
          <Link
            href={`/categories/${category.id}`}
            key={category.id}
            className="flex items-center justify-center h-60 transition duration-800 hover:scale-105 hover:opacity-90"
          >
            <span className="absolute uppercase font-bold text-2xl bg-white text-stone-500 rounded-lg p-1 border-2 border-stone-500">
              {category.name}
            </span>
            <Image
              src={category.urlImage}
              alt="slide 2"
              className="h-full w-full object-cover rounded-2xl"
              width="500"
              height="500"
            />
          </Link>
        ))}
      </div>
      <div className="flex justify-center bg-stone-500 my-10">
        <p className="p-6 font-bold text-white text-xl">
          Les Highlanders du moment
        </p>
      </div>

      <div className="grid gap-12 pb-7 md:grid-cols-2 md:gap-8 md:px-4 lg:grid-cols-3">
        {result.products.map((product) => (
          <Link
            key={product._id}
            href={`/products/${product.id}`}
            className="flex items-center justify-center h-60 transition duration-800 hover:scale-105 hover:opacity-90"
          >
            <span className="absolute uppercase font-bold text-2xl bg-white text-stone-500 rounded-lg p-1 border-2 border-stone-500">
              {product.name}
            </span>
            <Image
              src={product.urlImage}
              alt={product.name}
              className="h-full w-full object-cover rounded-2xl"
              width="500"
              height="500"
            />
          </Link>
        ))}
      </div>
    </>
  )
}

Home.isPublic = true

export default Home
