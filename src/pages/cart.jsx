import { CartContext } from "@/web/hooks/cartContext"
import routes from "@/web/routes"
import { faCartShopping, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import Link from "next/link"
import React, { useCallback, useContext, useEffect, useState } from "react"

const Cart = () => {
  const {
    actions: { addToCart, removeQuantity, removeOneProduct, removeAllFromCart },
    state: { cart },
  } = useContext(CartContext)

  const [cartItems, setCartItems] = useState([])
  const [totalPrice, setTotalPrice] = useState()
  const [totalTva, setTotalTva] = useState()

  useEffect(() => {
    setCartItems(cart)
  }, [cart])

  useEffect(() => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    )

    setTotalPrice(total)
  }, [cartItems])

  useEffect(() => {
    const total = totalPrice * (20 / 100)

    setTotalTva(total)
  }, [totalPrice])

  const handleClickReduceQuantity = useCallback(
    (product) => {
      removeQuantity(product)
    },
    [removeQuantity]
  )

  const handleClickIncreaseQuantity = useCallback(
    (product) => {
      addToCart(product, 1)
    },
    [addToCart]
  )

  const handleClickDeleteOne = useCallback(
    (product) => {
      removeOneProduct(product.id)
    },
    [removeOneProduct]
  )

  return (
    <>
      {cartItems.length > 0 ? (
        <div className="flex flex-1 flex-col md:flex-row gap-6 p-4">
          <div className="flex flex-col gap-4 items-left md:w-screen">
            {cartItems.map((product) => (
              <div key={product.id} className="flex flex-col md:p-4 border-b">
                <div className="flex">
                  <div className="flex flex-col gap-2 items-center">
                    <Image
                      src={product.urlImage}
                      alt="slide 2"
                      className="w-28 h-28 md:w-32 md:h-32 object-cover rounded-md"
                      width="200"
                      height="200"
                    />
                    <div className="flex  items-center justify-between h-6">
                      <button
                        className="flex items-center justify-center w-8 h-6 bg-gray-200 rounded-md hover:scale-110 duration-300"
                        onClick={() => handleClickReduceQuantity(product)}
                      >
                        -
                      </button>

                      <span className="p-2 font-semibold">
                        {product.quantity}
                      </span>

                      <button
                        className="flex items-center justify-center w-8 h-6 border bg-gray-200 rounded-md hover:scale-110 duration-300 disabled:cursor-not-allowed disabled:opacity-30"
                        onClick={() => handleClickIncreaseQuantity(product)}
                        disabled={product.quantity == product.stock}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col mx-2 w-full justify-between">
                    <div>
                      <span className="flex justify-between">
                        <Link
                          href={routes.product(product.slug)}
                          className="flex items-center font-bold text-black uppercase"
                        >
                          {product.name}
                        </Link>

                        <button
                          className="duration-300 hover:scale-125"
                          onClick={() => handleClickDeleteOne(product)}
                        >
                          <FontAwesomeIcon
                            icon={faTrash}
                            className="text-stone-500"
                          />
                        </button>
                      </span>
                      <div className="flex items-center justify-between">
                        <p className="truncate-3 w-[90%]">
                          {product.description}
                        </p>
                      </div>
                    </div>

                    <span className="flex justify-end text-sm font-bold">
                      {product.price * product.quantity} €
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center py-2"></div>
              </div>
            ))}

            <button
              className="flex justify-center w-1/4 rounded-lg p-2 bg-red-500 text-white shadow-lg duration-300 hover:bg-red-600"
              onClick={() => removeAllFromCart()}
            >
              Remove all
            </button>
          </div>

          <div className="flex flex-col w-full md:w-screen md:min-w-md md:max-w-sm border  h-fit rounded-lg p-4 shadow-xl">
            <p className="flex text-sm justify-between font-bold">
              <span>Subtotal</span>
              <span>{totalPrice} €</span>
            </p>

            <p className="flex justify-between text-xs text-stone-400 font-bold">
              <span>TVA</span>
              <span>{totalTva} €</span>
            </p>

            <p className="flex justify-between mt-4 text-lg font-bold  whitespace-nowrap">
              <span>TOTAL</span>
              <span>{totalPrice + totalTva} €</span>
            </p>

            <button className="border bg-stone-500 rounded-lg p-2 mt-4 whitespace-nowrap">
              Passer la commande
            </button>
          </div>
        </div>
      ) : (
        <div className="fixed inset-0">
          <div className="flex items-center justify-center min-h-screen">
            <div className="flex flex-col items-center gap-10 bg-white rounded-lg">
              <div className="flex flex-col items-center gap-10">
                <FontAwesomeIcon
                  icon={faCartShopping}
                  className="h-20 text-stone-500"
                />
                <p className="font-bold">Votre panier est tristement vide !</p>
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
      )}
    </>
  )
}

Cart.isPublic = true

export default Cart
