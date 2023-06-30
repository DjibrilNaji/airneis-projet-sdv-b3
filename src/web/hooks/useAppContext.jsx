import config from "@/web/config.js"
import createAPIClient from "@/web/createAPIClient.js"
import parseSession from "@/web/parseSession.js"
import signInService from "@/web/services/signIn.js"
import signUpService from "@/web/services/signUp.js"
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
import addNewOrderService from "../services/order/addNewOrder"
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
import getSingleProductService from "../services/admin/products/getSingleProduct"
import checkEmailService from "../services/checkEmail"
import resetPasswordService from "../services/resetPassword"
import getOrderDetailService from "../services/order/getOrderDetail"
import addRelOrderProductService from "../services/relOrderProduct/addRelOrderProduct"
import updateCategoryService from "../services/admin/categories/updateCategory"
import getSingleCategoryService from "../services/admin/categories/getSingleCategory"
import getImagesHomePageService from "../services/admin/image-home-page/getImagesHomePage"
import changeDisplayImageHomePageService from "../services/admin/image-home-page/changeDisplayImageHomePage"
import getSalesService from "../services/admin/dashboard/getSales"
import getSalesTodayService from "../services/admin/dashboard/getSalesToday"
import getCategoriesSalesService from "../services/admin/dashboard/getCategoriesSales"
import getAverageBasketService from "../services/admin/dashboard/getAverageBasket"
import getProductsSearchFilterService from "../services/search/getProductsSearchFilter"
import categoriesAndProductsService from "../services/categoriesAndProducts"

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
  const [currentPage, setCurrentPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [sortColumn, setSortColumn] = useState("id")
  const [order, setOrder] = useState("asc")
  const [selectedItems, setSelectedItems] = useState([])
  const [toggleDeleteOne, setToggleDeleteOne] = useState(false)
  const [itemIdToRemove, setItemIdToRemove] = useState()

  useEffect(() => {
    const jwt = localStorage.getItem(config.session.localStorageKey)

    if (!jwt) {
      return
    }

    const session = parseSession(jwt)

    setSession(session)
    setJWT(jwt)
  }, [])

  const handleSortChange = useCallback(
    (column) => {
      if (column === sortColumn) {
        setOrder(order === "asc" ? "desc" : "asc")
      } else {
        setSortColumn(column)
        setOrder("asc")
      }
    },
    [order, sortColumn]
  )

  const handleLimitChange = useCallback((e) => {
    const newLimit = parseInt(e.target.value)
    setLimit(newLimit)
    setCurrentPage(1)
  }, [])

  const handlePageChange = useCallback((newPage) => {
    setCurrentPage(newPage)
  }, [])

  const handleSelectItem = useCallback(
    (userId) => {
      if (selectedItems.includes(userId)) {
        setSelectedItems(selectedItems.filter((id) => id !== userId))
      } else {
        setSelectedItems([...selectedItems, userId])
      }
    },
    [selectedItems]
  )

  const selectedItemToRemove = useCallback((id) => {
    setToggleDeleteOne(true)
    setItemIdToRemove(id)
  }, [])

  const [session, setSession] = useState(null)
  const [jwt, setJWT] = useState(null)
  const api = createAPIClient({ jwt })
  const signUp = signUpService({ api })
  const signIn = signInService({ api, setSession, setJWT })
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
  const addNewOrder = addNewOrderService({ api })
  const getOrderDetail = getOrderDetailService({ api })

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
  const updateCategory = updateCategoryService({ api })

  const getSingleCategory = getSingleCategoryService({ api })
  const getProductsSearch = getProductsSearchService({ api })
  const getSingleProduct = getSingleProductService({ api })
  const checkEmail = checkEmailService({ api })
  const resetPassword = resetPasswordService({ api })

  const addRelOrderProduct = addRelOrderProductService({ api })

  const getImagesHomePage = getImagesHomePageService({ api })
  const changeDisplayImageHomePage = changeDisplayImageHomePageService({ api })

  const getSales = getSalesService({ api })
  const getSalesToday = getSalesTodayService({ api })
  const getCategoriesSales = getCategoriesSalesService({ api })
  const getAverageBasket = getAverageBasketService({ api })
  const getProductsSearchFilter = getProductsSearchFilterService({ api })

  const categoriesAndProducts = categoriesAndProductsService({ api })

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
          getSingleProduct,
          checkEmail,
          resetPassword,
          addNewOrder,
          getOrderDetail,
          addRelOrderProduct,
          updateCategory,
          getSingleCategory,
          getImagesHomePage,
          changeDisplayImageHomePage,
          getSales,
          getSalesToday,
          getCategoriesSales,
          getAverageBasket,
          getProductsSearchFilter,
          categoriesAndProducts,
          handleSortChange,
          handleLimitChange,
          handlePageChange,
          handleSelectItem,
          selectedItemToRemove,
          setToggleDeleteOne,
          setSelectedItems,
        },
        state: {
          session,
          limit,
          order,
          sortColumn,
          currentPage,
          toggleDeleteOne,
          itemIdToRemove,
          selectedItems,
        },
      }}
    />
  )
}

const useAppContext = () => useContext(AppContext)

export default useAppContext
