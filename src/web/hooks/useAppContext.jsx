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
import modifyAddressService from "../services/address/modifyAddress"
import deleteAddressService from "../services/address/deleteAddress"
import addAddressService from "../services/address/addNewAddress"
import addNewBillingAddressService from "../services/address/addNewBillingAddress"
import getPersonnalDataService from "../services/user/getPersonnalData"
import updatePersonnalDataService from "../services/user/updatePersonnalData"
import updateBillingAddressService from "../services/address/updateBillingAddress"
import getAllAddressService from "../services/address/getAllAddress"
import getSingleCategorieService from "../services/categories/getSingleCategorie"
import getAllProductsService from "../services/admin/products/getAllProducts"
import deleteProductsService from "../services/admin/products/deleteProducts"
import getSingleProductService from "../services/admin/products/getSingleProduct"
import updateProductService from "../services/admin/products/updateProduct"
import getMaterialsService from "../services/materials/getMaterials"
import getCategoriesService from "../services/categories/getCategories"
import addNewProductService from "../services/admin/products/addNewProduct"
import addMainImageService from "../services/admin/products/addMainImage"
import getContactService from "../services/admin/contact/getContact"
import deleteContactService from "../services/admin/contact/deleteContact"
import getOrdersService from "../services/admin/orders/getOrders"
import getSingleOrderService from "../services/admin/orders/getSingleOrder"
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
  const modifyAddress = modifyAddressService({ api })
  const deleteAddress = deleteAddressService({ api })
  const addNewAddress = addAddressService({ api })
  const addNewBillingAddress = addNewBillingAddressService({ api })
  const getPersonnalData = getPersonnalDataService({ api })
  const updatePersonnalData = updatePersonnalDataService({ api })
  const updateBillingAddress = updateBillingAddressService({ api })
  const getAllAddress = getAllAddressService({ api })
  const getSingleCategorie = getSingleCategorieService({ api })
  const getAllProducts = getAllProductsService({ api })
  const deleteProducts = deleteProductsService({ api })
  const getSingleProduct = getSingleProductService({ api })
  const updateProduct = updateProductService({ api })
  const getMaterials = getMaterialsService({ api })
  const getCategories = getCategoriesService({ api })
  const addNewProduct = addNewProductService({ api })
  const addMainImage = addMainImageService({ api })
  const getContact = getContactService({ api })
  const deleteContact = deleteContactService({ api })

  const getOrders = getOrdersService({ api })
  const getSingleOrder = getSingleOrderService({ api })

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
          modifyAddress,
          deleteAddress,
          addNewAddress,
          addNewBillingAddress,
          getPersonnalData,
          updatePersonnalData,
          updateBillingAddress,
          getAllAddress,
          getSingleCategorie,
          getAllProducts,
          deleteProducts,
          getSingleProduct,
          updateProduct,
          getMaterials,
          getCategories,
          addNewProduct,
          addMainImage,
          getContact,
          deleteContact,
          getOrders,
          getSingleOrder,
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
