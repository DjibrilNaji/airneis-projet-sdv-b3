import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faArrowLeft,
  faArrowRight,
  faCartPlus,
  faHeart,
} from "@fortawesome/free-solid-svg-icons"
import axios from "axios"
import config from "@/web/config"
import routes from "@/web/routes"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Link from "next/link"
import Error from "@/pages/_error"

export const getServerSideProps = async ({ params, req: { url } }) => {
  const productSlug = params.slug
  const query = Object.fromEntries(
    new URL(`http://example.com/${url}`).searchParams.entries()
  )

  try {
    const { data } = await axios.get(
      `${config.api.baseURL}${routes.api.products.single(productSlug, query)}`
    )

    return {
      props: {
        product: data,
      },
    }
  } catch (error) {
    const errorCode = error.response.status

    return {
      props: { errorCode: errorCode },
    }
  }
}

const Product = (props) => {
  const { product: data, errorCode } = props

  const router = useRouter()
  const [activeIndex, setActiveIndex] = useState(0)

  if (errorCode) {
    return <Error statusCode={errorCode} />
  }

  const mainImage = data.result.imageProduct.find((objet) => objet.isMain)

  const handlePrevious = () => {
    setActiveIndex(
      (prevActiveIndex) =>
        (prevActiveIndex - 1 + data.result.imageProduct.length) %
        data.result.imageProduct.length
    )
  }

  const handleNext = () => {
    setActiveIndex(
      (prevActiveIndex) =>
        (prevActiveIndex + 1) % data.result.imageProduct.length
    )
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex(
        (prevActiveIndex) =>
          (prevActiveIndex + 1) % data.result.imageProduct.length
      )
    }, 5000)

    return () => {
      clearInterval(intervalId)
    }
  }, [data.result.imageProduct.length])

  return (
    <>
      <div className="hidden md:flex items-center justify-center">
        <span className="absolute uppercase text-2xl font-bold text-stone-500 border-2 border-stone-500 bg-white rounded-xl p-2">
          {data.result.product.name}
        </span>
        <Image
          src={mainImage.urlImage}
          alt="slide 1"
          className="h-80 w-full object-cover"
          width="500"
          height="500"
        />
      </div>

      <div className="hidden md:flex m-4 font-bold">
        <button
          onClick={() => router.back()}
          className="transform hover:scale-110 transition-all"
        >
          <FontAwesomeIcon icon={faArrowLeft} /> Retour
        </button>
      </div>

      <div className="md:hidden relative">
        <div className="m-4 h-96 relative">
          {data.result.imageProduct.map((image, index) => (
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
        <button
          className="absolute top-[45%] text-stone-500 opacity-60 hover:opacity-100 left-0 transition-opacity ease-linear duration-300 disabled:opacity-20"
          onClick={handlePrevious}
          disabled={data.result.imageProduct.length === 1}
        >
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="fa-2xl p-2 rounded-full bg-white"
          />
        </button>

        <button
          className="absolute top-[45%] right-0 text-stone-500 opacity-60 hover:opacity-100 transition-opacity ease-linear duration-300 disabled:opacity-20"
          onClick={handleNext}
          disabled={data.result.imageProduct.length === 1}
        >
          <FontAwesomeIcon
            icon={faArrowRight}
            className="fa-2xl p-2 rounded-full bg-white"
          />
        </button>
      </div>

      <div className="md:hidden flex justify-center">
        {data.result.imageProduct.map((image, index) => (
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

      <div className="flex">
        <div className="hidden md:block w-full md:w-2/5 md:pr-8">
          <div className="relative">
            <div className="m-4 h-96 relative">
              {data.result.imageProduct.map((image, index) => (
                <Image
                  key={image.id}
                  src={image.urlImage}
                  alt="Carousel products"
                  className={`w-full h-full object-cover rounded-xl absolute ${
                    index === activeIndex ? "opacity-100" : "opacity-0"
                  } transition-opacity ease-linear duration-300`}
                  width="500"
                  height="500"
                />
              ))}
            </div>

            <div className="hidden md:block absolute top-1/2 transform -translate-y-1/2 left-0">
              <button
                className="text-stone-500 opacity-60 hover:opacity-100 transition-opacity ease-linear duration-300 disabled:opacity-20"
                onClick={handlePrevious}
                disabled={data.result.imageProduct.length === 1}
              >
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  className="fa-2xl p-2 rounded-full bg-white "
                />
              </button>
            </div>

            <div className="hidden md:block absolute top-1/2 transform -translate-y-1/2 right-0">
              <button
                className="text-stone-500 opacity-60 hover:opacity-100 transition-opacity ease-linear duration-300 disabled:opacity-20"
                onClick={handleNext}
                disabled={data.result.imageProduct.length === 1}
              >
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="fa-2xl p-2 rounded-full bg-white"
                />
              </button>
            </div>

            <div className="flex justify-center">
              {data.result.imageProduct.map((image, index) => (
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
        </div>

        <div className="flex w-full md:w-3/5">
          <div className="flex flex-col m-4 w-full">
            <div className="flex">
              <h1 className="text-lg font-bold">{data.result.product.name}</h1>

              <span className="ml-auto mx-4 font-bold">
                {data.result.product.price} €
              </span>
            </div>
            {data.result.product.quantity > 0 ? (
              <h2 className="flex text-stone-500 opacity-60 font-bold">
                En stock
              </h2>
            ) : (
              <h2 className="flex text-red-300 opacity-60 font-bold">
                Out of stock
              </h2>
            )}
            <p className="text-lg font-semibold my-4">
              {data.result.product.description}
            </p>
            <div className="flex justify-end gap-10 items-center m-6">
              <button
                className="transform hover:scale-125 transition-all disabled:scale-100 disabled:cursor-not-allowed disabled:opacity-50"
                title="Ajouter aux favoris"
              >
                <FontAwesomeIcon icon={faHeart} className="h-5 text-red-500" />
              </button>
              <button
                className="transform hover:scale-125 transition-all disabled:scale-100 disabled:cursor-not-allowed disabled:opacity-50"
                title="Ajouter au panier"
                disabled={data.result.product.quantity == 0}
              >
                <FontAwesomeIcon icon={faCartPlus} className="h-5" />
              </button>
            </div>
            <div className="border-b-2 border-t-2 py-4">
              <span className="font-bold">Catégorie : </span>
              <Link
                href={routes.categorie(data.result.productCategory[0].slug)}
                className="opacity-40 italic font-bold"
              >
                {data.result.productCategory[0].name}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center bg-stone-500 my-10">
        <p className="p-6 font-bold text-white text-xl">Produits similaires</p>
      </div>

      <div className="grid gap-12 pb-7 md:grid-cols-2 md:gap-8 md:px-4 lg:grid-cols-3">
        {data.result.randomProducts.map((product) => {
          const productImage = data.result.randomMainImage.find(
            (image) => image.productId === product.id
          )

          return (
            <Link
              key={product._id}
              href={routes.product(product.slug)}
              className="flex items-center justify-center h-60 transition duration-800 hover:scale-105 hover:opacity-90"
            >
              <span className="absolute uppercase font-bold text-2xl bg-white text-stone-500 rounded-lg p-1 border-2 border-stone-500">
                {product.name}
              </span>
              <Image
                src={productImage.urlImage}
                alt={product.name}
                className="h-full w-[90vw] md:w-full object-cover rounded-2xl"
                width="500"
                height="500"
              />
            </Link>
          )
        })}
      </div>
    </>
  )
}

Product.isPublic = true

export default Product
