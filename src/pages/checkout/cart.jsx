import { CartContext } from "@/web/hooks/cartContext"
import routes from "@/web/routes"
import { faCartShopping, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import Link from "next/link"
import React, { useCallback, useContext, useEffect, useState } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"
import OrderSummary from "@/web/components/Design/OrderSummary"
import { useRouter } from "next/router"
import cookie from "cookie"
import CenterItem from "@/web/components/Design/CenterItem"

export async function getServerSideProps({ locale, req }) {
  const cookies = req.headers.cookie
    ? cookie.parse(req.headers.cookie || "")
    : null

  const jwt = cookies ? (cookies.jwt !== undefined ? cookies.jwt : null) : null

  return {
    props: {
      jwt,
      ...(await serverSideTranslations(locale, ["cart", "navigation"])),
    },
  }
}

const Cart = (props) => {
  const { jwt } = props
  const {
    actions: { addToCart, removeQuantity, removeOneProduct, removeAllFromCart },
    state: { cart, subtotal, tva, total },
  } = useContext(CartContext)

  const { t } = useTranslation("cart")

  const [cartItems, setCartItems] = useState([])
  const router = useRouter()

  useEffect(() => {
    setCartItems(cart)
  }, [cart])

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

  const handleClick = () => {
    router.push({
      pathname: jwt ? routes.checkout.delivery() : routes.signIn(),
      query: !jwt && { redirection: "cart" },
    })
  }

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
                      {(product.price * product.quantity).toFixed(2)} €
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
              {t("remove")}
            </button>
          </div>

          <OrderSummary
            price={subtotal}
            totalTva={tva}
            totalPrice={total}
            handleClick={handleClick}
            buttonName={t("to_order")}
          />
        </div>
      ) : (
        <CenterItem
          icon={faCartShopping}
          content={t("empty_cart")}
          button={t("go_home")}
        />
      )}
    </>
  )
}

Cart.isPublic = true

export default Cart
