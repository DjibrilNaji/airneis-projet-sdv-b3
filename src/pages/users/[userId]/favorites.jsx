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
import { useCallback, useState } from "react"

export const getServerSideProps = async ({ params, req, req: { url } }) => {
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
    },
  }
}

const Favorite = (props) => {
  const {
    favorites: { result },
    userId,
    token,
  } = props

  const [favorite, setFavorite] = useState(result)

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

  return (
    <>
      {favorite.length === 0 ? (
        <div className="fixed inset-0">
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-gray-500"></div>
            <div className="flex flex-col items-center gap-20 bg-white rounded-lg">
              <div className="mb-4">
                <h3 className="font-bold text-2xl">My Favourits</h3>
              </div>
              <div className="flex flex-col items-center mb-4">
                <FontAwesomeIcon
                  icon={faBoxOpen}
                  className="h-20 text-stone-500"
                />
                <p>Your favorites list is empty !</p>
              </div>
              <div className="">
                <Link
                  href={"/"}
                  className="bg-stone-500 px-4 text-xl py-2 rounded-md text-white"
                >
                  Go home
                </Link>
              </div>
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
                        <FontAwesomeIcon icon={faCartPlus} className="h-6" />
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
