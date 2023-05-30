import config from "@/web/config.js"
import createAPIClient from "@/web/createAPIClient.js"
import parseSession from "@/web/parseSession.js"
import signInService from "@/web/services/signIn.js"
import signUpService from "@/web/services/signUp.js"
import patchOrderQuantityService from "../services/order/patchOrderQuantity"
import deleteProductOrderService from "../services/order/deleteProductOrder"
import cancelOrderService from "../services/order/cancelOrder"
import modifyAddressService from "../services/address/modifyAddress"
import deleteAddressService from "../services/address/deleteAddress"
import addAddressService from "../services/address/addNewAddress"
import getAllAddressService from "../services/address/getAllAddress"
import addNewBillingAddressService from "../services/address/addNewBillingAddress"
import updatePersonnalDataService from "../services/user/updatePersonnalData"
import updateBillingAddressService from "../services/address/updateBillingAddress"
import getAllProductsService from "../services/admin/products/getAllProducts"
import deleteProductsService from "../services/admin/products/deleteProducts"
import updateProductService from "../services/admin/products/updateProduct"
import getMaterialsService from "../services/materials/getMaterials"
import getCategoriesService from "../services/categories/getCategories"
import addNewProductService from "../services/admin/products/addNewProduct"
import addMainImageService from "../services/admin/products/addMainImage"
import getContactService from "../services/admin/contact/getContact"
import deleteContactService from "../services/admin/contact/deleteContact"
import getOrdersService from "../services/admin/orders/getOrders"
import getSingleOrderService from "../services/admin/orders/getSingleOrder"
import getUsersService from "../services/admin/users/getUsers"
import getSingleUserService from "../services/admin/users/getSingleUser"
import deleteUserService from "../services/admin/users/deleteUser"
import updateUserService from "../services/admin/users/updateUser"
import addUserService from "../services/admin/users/addUser"
import contactService from "../services/contact"
import getFavoriteService from "../services/favorites/getFavorites"
import deleteFavoriteService from "../services/favorites/deleteFavorites"
import getSingleFavoriteService from "../services/products/favorites/getSingleFavorite"
import addFavoriteService from "../services/products/favorites/addFavorite"
import deleteCategoryService from "../services/admin/categories/deleteCategory"
import getProductsSearchService from "../services/search/getProductsSearch"
import getAllCategoriesService from "../services/admin/categories/getAllCategories"

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
  const getAllAddress = getAllAddressService({ api })
  const modifyAddress = modifyAddressService({ api })
  const deleteAddress = deleteAddressService({ api })
  const addNewAddress = addAddressService({ api })
  const addNewBillingAddress = addNewBillingAddressService({ api })
  const updatePersonnalData = updatePersonnalDataService({ api })
  const updateBillingAddress = updateBillingAddressService({ api })
  const getAllProducts = getAllProductsService({ api })
  const deleteProducts = deleteProductsService({ api })
  const updateProduct = updateProductService({ api })
  const getMaterials = getMaterialsService({ api })
  const getCategories = getCategoriesService({ api })
  const addNewProduct = addNewProductService({ api })
  const addMainImage = addMainImageService({ api })
  const getContact = getContactService({ api })
  const deleteContact = deleteContactService({ api })

  const getOrders = getOrdersService({ api })
  const getSingleOrder = getSingleOrderService({ api })

  const getUsers = getUsersService({ api })
  const getSingleUser = getSingleUserService({ api })
  const deleteUser = deleteUserService({ api })
  const updateUser = updateUserService({ api })
  const addUser = addUserService({ api })

  const contact = contactService({ api })

  const getFavorites = getFavoriteService({ api })
  const deleteFavorite = deleteFavoriteService({ api })

  const getSingleFavorite = getSingleFavoriteService({ api })
  const addFavorite = addFavoriteService({ api })
  const deleteCategory = deleteCategoryService({ api })
  const getAllCategories = getAllCategoriesService({ api })

  const getProductsSearch = getProductsSearchService({ api })

  const signOut = useCallback(() => {
    localStorage.removeItem(config.session.localStorageKey)
    localStorage.removeItem("username")
    setSession(false)
    const date = new Date()
    date.setDate(date.getDate() - 100)
    document.cookie = `jwt=; expires=${date}; path=/;`
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
          modifyAddress,
          deleteAddress,
          addNewAddress,
          getAllAddress,
          addNewBillingAddress,
          updatePersonnalData,
          updateBillingAddress,
          getAllProducts,
          deleteProducts,
          updateProduct,
          getMaterials,
          getCategories,
          addNewProduct,
          addMainImage,
          getContact,
          deleteContact,
          getOrders,
          getSingleOrder,
          getUsers,
          getSingleUser,
          deleteUser,
          updateUser,
          addUser,
          contact,
          getFavorites,
          deleteFavorite,
          getSingleFavorite,
          addFavorite,
          deleteCategory,
          getProductsSearch,
          getAllCategories,
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
