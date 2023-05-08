import axios from "axios"
import routes from "@/web/routes"
import config from "@/web/config"
import Image from "next/image"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faBoxOpen,
  faCartPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons"
import cookie from "cookie"
import { useCallback, useContext, useState } from "react"
import { CartContext } from "@/web/hooks/cartContext"
import Dialog from "@/web/components/Dialog"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

export const getServerSideProps = async ({
  locale,
  params,
  req,
  req: { url },
}) => {
  const userId = params.userId

  const { token } = cookie.parse(
    req ? req.headers.cookie || "" : document.cookie
  )
  const query = Object.fromEntries(
    new URL(`http://example.com/${url}`).searchParams.entries()
  )

  const { data } = await axios.get(
    `${config.api.baseURL}${routes.api.users.favorites.collection(
      userId,
      query
    )}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )

  return {
    props: {
      favorites: data,
      userId,
      token,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  }
}

const Favorite = (props) => {
  const {
    favorites: { result },
    userId,
    token,
  } = props

  const {
    actions: { addToCart },
  } = useContext(CartContext)

  const [favorite, setFavorite] = useState(result)
  const [isOpen, setIsOpen] = useState(false)
  const [contentDialog, setContentDialog] = useState()

  const handleDeleteFavorite = useCallback(
    async (favoriteId) => {
      await axios.delete(
        `${config.api.baseApiURL}${routes.api.users.favorites.single(userId, {
          favoriteId: favoriteId,
        })}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )

      const { data } = await axios.get(
        `${config.api.baseApiURL}${routes.api.users.favorites.collection(
          userId
        )}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )

      setFavorite(data.result)
    },
    [token, userId]
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
              <div key={product.slug}>
                <div className="border shadow-lg rounded-xl h-full px-2">
                  <Link href={routes.product(product.slug)}>
                    <Image
                      src={product.urlImage}
                      alt="slide 2"
                      className="object-cover rounded-lg w-full h-72 pt-2"
                      width="300"
                      height="500"
                    />
                  </Link>
                  <div className="px-2 py-4">
                    <Link
                      href={routes.product(product.slug)}
                      className="font-bold uppercase text-md"
                    >
                      {product.name}
                    </Link>
                  </div>
                  <div className="flex justify-between ">
                    <span className="text-left px-2 text-lg">
                      {product.price}€
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
                            handleAddToCart(product, product.urlImage)
                          }
                        />
                      </button>
                      <button
                        className="transform hover:scale-125 transition-all disabled:scale-100 disabled:cursor-not-allowed disabled:opacity-50"
                        title="Supprimer"
                        onClick={() => handleDeleteFavorite(product.id)}
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
