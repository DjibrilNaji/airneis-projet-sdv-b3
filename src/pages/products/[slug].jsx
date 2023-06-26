/* eslint-disable react-hooks/rules-of-hooks */
import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart, faHeartBroken } from "@fortawesome/free-solid-svg-icons"
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
import Banner from "@/web/components/Banner"
import Modal from "@/web/components/Modal"
import Carousel from "@/web/components/Carousel"

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
      materials: data.result.product.materials,
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
    materials,
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

  const [isOpen, setIsOpen] = useState(false)
  const [contentDialog, setContentDialog] = useState()
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState()
  const [selectedQuantity, setSelectedQuantity] = useState(1)
  const [quantityDisplay, setQuantityDisplay] = useState([])
  const [mainImage, setMainImage] = useState([])
  const [error, setError] = useState("")

  const [toggleViewMaterials, setToggleViewMaterials] = useState(false)

  useEffect(() => {
    setMainImage(image.find((img) => img.isMain))
    setIsFavorite(favorite.length > 0 ? true : false)
  }, [data.result.product.category, image, favorite])

  const cartItems = cart.find((item) => item.slug === product.slug)

  const currentInventory = cartItems
    ? product.stock - cartItems.quantity
    : product.stock

  const handleAddFavorites = useCallback(
    async (productId) => {
      if (isFavorite) {
        setContentDialog(t("pop_already_in_favorite"))
      } else {
        const [err] = await addFavorite(userId, productId)

        if (err) {
          setError(err)

          return
        }

        setIsFavorite(true)
        setContentDialog(t("pop_add_to_favorite"))
      }

      setIsOpen(true)
      setTimeout(() => setIsOpen(false), 2000)
    },
    [userId, isFavorite, addFavorite, t]
  )

  const handleAddProduct = useCallback(
    (product, image) => {
      addToCart(product, image, parseInt(quantity))
      setContentDialog(t("pop_add_to_cart"))
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
        content={contentDialog}
        dir={direction}
      />

      <Modal
        isOpen={toggleViewMaterials}
        modalTitle={"Materials"}
        closeModal={() => setToggleViewMaterials(false)}
      >
        {materials.map((material, index) => (
          <ul key={index}>
            <li className="text-lg font-semibold">- {material.nameMaterial}</li>
          </ul>
        ))}
      </Modal>

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

      <Carousel image={image} className="md:hidden" />

      <div className="flex">
        <div className="hidden md:block w-full md:w-2/5 md:pr-8">
          <Carousel image={image} />
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

            {materials.length > 0 && (
              <button
                onClick={() => setToggleViewMaterials(true)}
                className="font-semibold text-gray-700 flex border-2 w-fit px-2 rounded-lg bg-stone-200 text-lg"
              >
                More informations
              </button>
            )}

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

      <Banner text={t("similar_products")} />

      <div className="flex overflow-x-auto w-full gap-7 mb-8 bg-stone-300 p-4">
        {randomProducts.map((product) => (
          <div key={product.id} className="flex-none w-full md:w-1/2 lg:w-1/3">
            <Link href={routes.product(product.slug)} className="relative">
              <Image
                src={product.image.find((img) => img.isMain).urlImage}
                alt={product.name}
                className="w-full h-56 object-cover"
                width="500"
                height="500"
              />

              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl border-2 text-stone-500 font-semibold border-stone-500 bg-white p-1 whitespace-nowrap rounded-lg">
                {product.name}
              </span>
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}

Product.isPublic = true

export default Product
