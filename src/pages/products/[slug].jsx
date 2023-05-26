/* eslint-disable react-hooks/rules-of-hooks */
import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faArrowLeft,
  faArrowRight,
  faHeart,
  faHeartBroken,
} from "@fortawesome/free-solid-svg-icons"
import routes from "@/web/routes"
import { useCallback, useContext, useEffect, useState } from "react"
import Link from "next/link"
import BackButton from "@/web/components/BackButton"
import cookie from "cookie"
import Button from "@/web/components/Button"
import { CartContext } from "@/web/hooks/cartContext"
import Dialog from "@/web/components/Dialog"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"
import useAppContext from "@/web/hooks/useAppContext"
import FormError from "@/web/components/FormError"
import getSingleProductBySlugService from "@/web/services/products/getSingleProductBySlug"
import createAPIClient from "@/web/createAPIClient"
import getSingleFavoriteService from "@/web/services/products/favorites/getSingleFavorite"

export const getServerSideProps = async ({ locale, params, req }) => {
  const productSlug = params.slug

  const cookies = req.headers.cookie
    ? cookie.parse(req.headers.cookie || "")
    : null

  const jwt = cookies ? (cookies.jwt !== undefined ? cookies.jwt : null) : null
  const userId = cookies
    ? cookies.userId !== undefined
      ? cookies.userId
      : null
    : null

  const redirection = () => {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  const api = createAPIClient({ jwt, server: true })

  const getSingleProductBySlug = getSingleProductBySlugService({ api })
  const getSingleFavorite = getSingleFavoriteService({ api })

  const [err, data] = await getSingleProductBySlug(productSlug)

  if (err) {
    return redirection()
  }

  let favorite = []

  if (jwt && userId) {
    const [error, dataFavorites] = await getSingleFavorite(userId, productSlug)

    if (error) {
      return redirection()
    } else {
      favorite = dataFavorites
    }
  }

  return {
    props: {
      jwt,
      favorite: jwt ? favorite.result : [],
      userId,
      data,
      product: data.result.product,
      randomProducts: data.result.randomProducts,
      image: data.result.product.image,
      category: data.result.product.category[0],
      ...(await serverSideTranslations(locale, ["product", "navigation"])),
    },
  }
}

const Product = (props) => {
  const {
    jwt,
    favorite,
    userId,
    data,
    product,
    randomProducts,
    image,
    category,
  } = props

  const {
    actions: { addFavorite },
  } = useAppContext()
  const {
    actions: { addToCart },
    state: { cart },
  } = useContext(CartContext)

  const { t } = useTranslation("product")
  const { locale } = useRouter()
  const direction = t("direction", { locale })

  const [activeIndex, setActiveIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [contentModal, setContentModal] = useState()
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState()
  const [selectedQuantity, setSelectedQuantity] = useState(1)
  const [quantityDisplay, setQuantityDisplay] = useState([])
  const [mainImage, setMainImage] = useState([])
  const [error, setError] = useState("")

  useEffect(() => {
    setMainImage(image.find((img) => img.isMain))
    setIsFavorite(favorite.length > 0 ? true : false)
  }, [data.result.product.category, image, favorite])

  const cartItems = cart.find((item) => item.slug === product.slug)

  const currentInventory = cartItems
    ? product.stock - cartItems.quantity
    : product.stock

  const handlePrevious = () => {
    setActiveIndex(
      (prevActiveIndex) => (prevActiveIndex - 1 + image.length) % image.length
    )
  }

  const handleNext = () => {
    setActiveIndex((prevActiveIndex) => (prevActiveIndex + 1) % image.length)
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex((prevActiveIndex) => (prevActiveIndex + 1) % image.length)
    }, 5000)

    return () => {
      clearInterval(intervalId)
    }
  }, [image.length])

  const handleAddFavorites = useCallback(
    async (productId) => {
      if (isFavorite) {
        setContentModal(t("pop_already_in_favorite"))
      } else {
        const [err] = await addFavorite(userId, productId)

        if (err) {
          setError(err)

          return
        }

        setIsFavorite(true)
        setContentModal(t("pop_add_to_favorite"))
      }

      setIsOpen(true)
      setTimeout(() => setIsOpen(false), 2000)
    },
    [userId, isFavorite, addFavorite, t]
  )

  const handleAddProduct = useCallback(
    (product, image) => {
      addToCart(product, image, parseInt(quantity))
      setContentModal(t("pop_add_to_cart"))
      setIsOpen(true)
      setTimeout(() => setIsOpen(false), 2000)
      setQuantity(1)
      setSelectedQuantity(1)
    },
    [addToCart, quantity, t]
  )

  const handleQuantityChange = useCallback((e) => {
    setQuantity(e.target.value)
    setSelectedQuantity(e.target.value)
  }, [])

  useEffect(() => {
    const newQuantityDisplay = []
    for (let i = 1; i <= currentInventory; i++) {
      newQuantityDisplay.push(
        <option key={i} value={i}>
          {i}
        </option>
      )
    }
    setQuantityDisplay(newQuantityDisplay)
  }, [currentInventory])

  return (
    <>
      {error ? <FormError error={error} /> : ""}

      <Dialog
        isOpen={isOpen}
        dialogTitle={t("pop_title")}
        content={contentModal}
        dir={direction}
      />

      <div className="hidden md:flex items-center justify-center">
        <span className="absolute uppercase text-2xl font-bold text-stone-500 border-2 border-stone-500 bg-white rounded-xl p-2">
          {product.name}
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
        <BackButton />
      </div>

      <div className="md:hidden relative">
        <div className="m-4 h-96 relative">
          {image.map((image, index) => (
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
          disabled={image.length === 1}
        >
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="fa-2xl p-2 rounded-full bg-white"
          />
        </button>

        <button
          className="absolute top-[45%] right-0 text-stone-500 opacity-60 hover:opacity-100 transition-opacity ease-linear duration-300 disabled:opacity-20"
          onClick={handleNext}
          disabled={image.length === 1}
        >
          <FontAwesomeIcon
            icon={faArrowRight}
            className="fa-2xl p-2 rounded-full bg-white"
          />
        </button>
      </div>

      <div className="md:hidden flex justify-center">
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

      <div className="flex">
        <div className="hidden md:block w-full md:w-2/5 md:pr-8">
          <div className="relative">
            <div className="m-4 h-96 relative">
              {image.map((image, index) => (
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
                disabled={image.length === 1}
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
                disabled={image.length === 1}
              >
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="fa-2xl p-2 rounded-full bg-white"
                />
              </button>
            </div>

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
        </div>

        <div className="flex w-full md:w-3/5">
          <div className="flex flex-col m-4 w-full">
            <div className="flex gap-4 items-center">
              <h1 className="text-lg font-bold">{product.name}</h1>

              {jwt && (
                <button
                  className="flex items-center transform hover:scale-125 transition-all disabled:scale-100 disabled:cursor-not-allowed disabled:opacity-50"
                  title="Ajouter aux favoris"
                >
                  <FontAwesomeIcon
                    icon={isFavorite ? faHeart : faHeartBroken}
                    className={`h-5 ${
                      isFavorite ? " text-red-500" : "text-yellow-500"
                    }`}
                    onClick={() => handleAddFavorites(product.id)}
                  />
                </button>
              )}

              <span className="ml-auto mx-4 font-bold">{product.price} €</span>
            </div>

            {product.stock > 0 ? (
              <h2 className="flex text-stone-500 opacity-60 font-bold">
                {t("in_stock")}
              </h2>
            ) : (
              <h2 className="flex text-red-300 opacity-60 font-bold">
                {t("out_of_stock")}
              </h2>
            )}

            <p className="text-lg font-semibold my-4">{product.description}</p>

            <div className="flex my-4">
              <div className="flex flex-col gap-4 ml-auto">
                <div className="flex justify-center gap-2">
                  <span>{t("quantity")}</span>

                  <select
                    className="border-2 rounded-lg px-2 focus:outline-none"
                    onChange={handleQuantityChange}
                    value={selectedQuantity}
                  >
                    {quantityDisplay}
                  </select>
                </div>

                <Button
                  onClick={() => handleAddProduct(product, mainImage.urlImage)}
                  className="disabled:cursor-not-allowed disabled:bg-stone-300"
                  disabled={currentInventory === 0}
                >
                  {t("add_to_cart")}
                </Button>
              </div>
            </div>

            <div className="border-b-2 border-t-2 py-4" dir={direction}>
              <span className="font-bold">{t("category")} : </span>
              <Link
                href={routes.categorie(category.slug)}
                className="opacity-40 italic font-bold"
              >
                {category.name}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center bg-stone-500 my-10">
        <p className="p-6 font-bold text-white text-xl">
          {t("similar_products")}
        </p>
      </div>

      <div className="grid gap-12 pb-7 md:grid-cols-2 md:gap-8 md:px-4 lg:grid-cols-3">
        {randomProducts.map((product) => {
          return (
            <Link
              key={product.id}
              href={routes.product(product.slug)}
              className="flex items-center justify-center h-60 transition duration-800 hover:scale-105 hover:opacity-90"
            >
              <span className="absolute uppercase font-bold text-2xl bg-white text-stone-500 rounded-lg p-1 border-2 border-stone-500">
                {product.name}
              </span>
              <Image
                src={product.image.find((img) => img.isMain).urlImage}
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
