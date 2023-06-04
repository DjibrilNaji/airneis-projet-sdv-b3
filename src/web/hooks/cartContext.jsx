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

  const [subtotal, setSubtotal] = useState()
  const [tva, setTva] = useState()
  const [total, setTotal] = useState()
  const [totalStripe, setTotalStripe] = useState()
  const [productsIdQuantities, setProductsIdQuantities] = useState()

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))

    const newSubtotal = cart.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    )
    const newTva = newSubtotal * (20 / 100)
    const newTotal = newSubtotal + newTva

    newSubtotal > 0 ? setSubtotal(newSubtotal.toFixed(2)) : setSubtotal(0)
    newTva > 0 ? setTva(newTva.toFixed(2)) : setTva(0)
    newTotal > 0 ? setTotal(newTotal.toFixed(2)) : setTotal(0)
    setTotalStripe(total * 100)

    const idQuantities = []

    cart.forEach((item) => {
      idQuantities.push({ id: item.id, quantity: item.quantity })
    })

    setProductsIdQuantities(idQuantities)
  }, [cart, subtotal, tva, total])

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
        state: {
          cart,
          subtotal,
          tva,
          total,
          totalStripe,
          productsIdQuantities,
        },
      }}
    />
  )
}

const useCartContext = () => useContext(CartContext)

export default useCartContext
