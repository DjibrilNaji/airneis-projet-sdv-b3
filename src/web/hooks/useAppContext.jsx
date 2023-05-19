import config from "@/web/config.js"
import createAPIClient from "@/web/createAPIClient.js"
import parseSession from "@/web/parseSession.js"
import signInService from "@/web/services/signIn.js"
import signUpService from "@/web/services/signUp.js"
import patchOrderQuantityService from "../services/order/patchOrderQuantity"
import deleteProductOrderService from "../services/order/deleteProductOrder"
import cancelOrderService from "../services/order/cancelOrder"
import getOrderDetailService from "../services/order/getOrderDetail"
import allOrderUserService from "../services/order/allOrderUser"
import getSingleAddressService from "../services/address/getSingleAddress"
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"

const AppContext = createContext()

export const AppContextProvider = (props) => {
  const { isPublicPage, ...otherProps } = props
  useEffect(() => {
    const jwt = localStorage.getItem(config.session.localStorageKey)

    if (!jwt) {
      return
    }

    const session = parseSession(jwt)

    setSession(session)
    setJWT(jwt)
  }, [])

  const [session, setSession] = useState(null)
  const [jwt, setJWT] = useState(null)
  const api = createAPIClient({ jwt })
  const signUp = signUpService({ api })
  const signIn = signInService({ api, setSession, setJWT })
  const patchOrderQuantity = patchOrderQuantityService({ api })
  const deleteProductOrder = deleteProductOrderService({ api })
  const cancelOrder = cancelOrderService({ api })
  const getOrderDetail = getOrderDetailService({ api })
  const allOrderUser = allOrderUserService({ api })
  const getSingleAddress = getSingleAddressService({ api })
  const signOut = useCallback(() => {
    localStorage.removeItem(config.session.localStorageKey)
    localStorage.removeItem("username")
    setSession(false)
    const date = new Date()
    date.setDate(date.getDate() - 100)
    document.cookie = `token=; expires=${date}; path=/;`
    document.cookie = `userId=; expires=${date}; path=/;`
  }, [])

  if (!isPublicPage && session === null) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white text-4xl font-bold">
        <span className="animate-bounce">Loading...</span>
      </div>
    )
  }

  return (
    <AppContext.Provider
      {...otherProps}
      value={{
        actions: {
          signUp,
          signOut,
          signIn,
          patchOrderQuantity,
          deleteProductOrder,
          cancelOrder,
          getOrderDetail,
          allOrderUser,
          getSingleAddress,
        },
        state: {
          session,
        },
      }}
    />
  )
}

const useAppContext = () => useContext(AppContext)

export default useAppContext
