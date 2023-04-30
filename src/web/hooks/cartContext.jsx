import { createContext, useContext, useEffect, useState } from "react"

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
              ? { ...item, quantity: item.quantity + quantity }
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

  return (
    <CartContext.Provider
      {...props}
      value={{
        actions: { addToCart },
        state: { cart },
      }}
    />
  )
}

const useCartContext = () => useContext(CartContext)

export default useCartContext
