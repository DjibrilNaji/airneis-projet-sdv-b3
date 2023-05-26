import routes from "@/web/routes"
import Image from "next/image"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faBoxOpen,
  faCartPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons"
import { useCallback, useContext, useEffect, useState } from "react"
import { CartContext } from "@/web/hooks/cartContext"
import Dialog from "@/web/components/Dialog"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import useAppContext from "@/web/hooks/useAppContext"
import FormError from "@/web/components/FormError"
import cookie from "cookie"
import createAPIClient from "@/web/createAPIClient"
import getFavoritesService from "@/web/services/favorites/getFavorites"

export const getServerSideProps = async ({ locale, params, req }) => {
  const userId = params.userId

  const cookies = req.headers.cookie
    ? cookie.parse(req.headers.cookie || "")
    : null
  const jwt = cookies.jwt !== undefined ? cookies.jwt : null
  const userIdCookie = cookies.userId !== undefined ? cookies.userId : null

  const redirection = () => {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  if (userId !== userIdCookie) {
    return redirection()
  }

  const api = createAPIClient({ jwt, server: true })
  const getFavorites = getFavoritesService({ api })

  const [err, data] = await getFavorites(userId)

  if (err) {
    return redirection()
  }

  return {
    props: {
      userId,
      data: data.result,
      ...(await serverSideTranslations(locale, ["common", "navigation"])),
    },
  }
}

const Favorite = (props) => {
  const { userId, data } = props

  const {
    actions: { addToCart },
  } = useContext(CartContext)

  const {
    actions: { getFavorites, deleteFavorite },
  } = useAppContext()

  const [error, setError] = useState("")

  const [favorite, setFavorite] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [contentDialog, setContentDialog] = useState()

  useEffect(() => {
    setFavorite(data)
  }, [data])

  const handleDeleteFavorite = useCallback(
    async (favoriteId) => {
      const [err] = await deleteFavorite(userId, {
        favoriteId: favoriteId,
      })

      if (err) {
        setError(err)

        return
      }

      const [error, data] = await getFavorites(userId)

      if (error) {
        setError(error)

        return
      }

      setFavorite(data.result)
    },
    [deleteFavorite, getFavorites, userId]
  )

  const handleAddToCart = useCallback(
    (product, image) => {
      addToCart(product, image, 1)
      setContentDialog("Votre produit a bien été ajouté aux panier")
      setIsOpen(true)
      setTimeout(() => setIsOpen(false), 2500)
    },
    [addToCart]
  )

  return (
    <>
      {error ? <FormError error={error} /> : ""}

      <Dialog
        isOpen={isOpen}
        dialogTitle="Informations"
        content={contentDialog}
      />

      {favorite.length === 0 ? (
        <div className="fixed inset-0">
          <div className="flex items-center justify-center min-h-screen">
            <div className="flex flex-col items-center gap-10 bg-white rounded-lg">
              <div className="flex flex-col items-center gap-10">
                <FontAwesomeIcon
                  icon={faBoxOpen}
                  className="h-20 text-stone-500"
                />
                <p className="font-bold">Your favorites list is empty !</p>
              </div>
              <Link
                href={"/"}
                className="bg-stone-500 px-4 text-xl py-2 rounded-md text-white"
              >
                Go home
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <>
          <h1 className="flex text-stone-400 text-3xl font-bold justify-center my-6">
            My Favourits
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mx-4 my-4">
            {favorite.map((product) => (
              <div key={product.product.slug}>
                <div className="border shadow-lg rounded-xl h-full px-2">
                  <Link href={routes.product(product.product.slug)}>
                    <Image
                      src={product.product.image[0].urlImage}
                      alt="slide 2"
                      className="object-cover rounded-lg w-full h-72 pt-2"
                      width="300"
                      height="500"
                    />
                  </Link>
                  <div className="px-2 py-4">
                    <Link
                      href={routes.product(product.product.slug)}
                      className="font-bold uppercase text-md"
                    >
                      {product.product.name}
                    </Link>
                  </div>
                  <div className="flex justify-between ">
                    <span className="text-left px-2 text-lg">
                      {product.product.price}€
                    </span>
                    <div className="flex justify-end gap-5 px-2 items-center my-4 ">
                      <button
                        className="transform hover:scale-125 transition-all disabled:scale-100 disabled:cursor-not-allowed disabled:opacity-50"
                        title="Ajouter au panier"
                      >
                        <FontAwesomeIcon
                          icon={faCartPlus}
                          className="h-6"
                          onClick={() =>
                            handleAddToCart(product, product.product.urlImage)
                          }
                        />
                      </button>
                      <button
                        className="transform hover:scale-125 transition-all disabled:scale-100 disabled:cursor-not-allowed disabled:opacity-50"
                        title="Supprimer"
                        onClick={() => handleDeleteFavorite(product.product.id)}
                      >
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="h-6 text-red-500"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  )
}

export default Favorite
