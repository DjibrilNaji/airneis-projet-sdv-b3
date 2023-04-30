import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"

export const CartContext = createContext()

export const CartContextProvider = (props) => {
  const [cart, setCart] = useState(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const items = localStorage.getItem("cart")

      if (items) {
        return JSON.parse(items)
      }
    }

    return []
  })

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (product, image, quantity) => {
    const existingProduct = cart.find((item) => item.id === product.id)

    if (existingProduct) {
      if (existingProduct.quantity === product.stock) {
        return
      } else {
        setCart((prevItems) =>
          prevItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + (quantity ? quantity : 1) }
              : item
          )
        )
      }
    } else {
      setCart((prevItems) => [
        ...prevItems,
        { ...product, urlImage: image, quantity: quantity },
      ])
    }
  }

  const removeQuantity = useCallback(
    (product) => {
      const existingItem = cart.find((item) => item.id === product.id)

      if (existingItem.quantity - 1 === 0) {
        setCart((prevItems) =>
          prevItems.filter((item) => item.id !== product.id)
        )
      } else {
        setCart((prevItems) =>
          prevItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
        )
      }
    },
    [cart]
  )

  const removeAllFromCart = () => {
    setCart([])
  }

  const removeOneProduct = useCallback((productId) => {
    setCart((products) => products.filter(({ id }) => id !== productId))
  }, [])

  return (
    <CartContext.Provider
      {...props}
      value={{
        actions: {
          addToCart,
          removeQuantity,
          removeOneProduct,
          removeAllFromCart,
        },
        state: { cart },
      }}
    />
  )
}

const useCartContext = () => useContext(CartContext)

export default useCartContext
