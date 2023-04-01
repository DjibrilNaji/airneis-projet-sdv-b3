const createRouteWithQueryParams = (route, query) => {
  if (!query) {
    return route
  }

  const qs = new URLSearchParams(query).toString()

  return `${route}?${qs}`
}

const routes = {
  home: () => "/",
  signUp: () => "/register",
  signIn: () => "/login",
  product: (idProduct) => `/products/${idProduct}`,
  users: {
    single: (userId) => `/users/${userId}/myAccount`,
    addressSingle: (addressId) => `/users/address/${addressId}/editAddress`,
  },
  orders: {
    collection: (idUser) => `/users/${idUser}/allOrdersUser`,
    single: (numberOrder) => `/users/order/${numberOrder}`,
  },
  api: {
    signUp: () => "/register",
    signIn: () => "/login",
    contact: () => "/contact",
    users: {
      single: (userId, query) =>
        createRouteWithQueryParams(`/users/${userId}/personnalData`, query),
      update: (userId) => `/users/${userId}/personnalData`,
      address: (userId, query) =>
        createRouteWithQueryParams(`/users/${userId}/address`, query),
      singleAddress: (addressId, query) =>
        createRouteWithQueryParams(
          `/users/address/${addressId}/addressSingle`,
          query
        ),
    },
    categoriesAndProducts: {
      collection: () => "/categories-and-products",
    },
    categories: {
      single: (idCategory, query) =>
        createRouteWithQueryParams(`/categories/${idCategory}`, query),
    },
    orders: {
      collection: (userId, query) =>
        createRouteWithQueryParams(`/users/${userId}/allOrdersUser`, query),
      single: (numberOrder, query) =>
        createRouteWithQueryParams(`/users/order/${numberOrder}`, query),
      patchQuantity: (numberOrder, query) =>
        createRouteWithQueryParams(`/users/order/${numberOrder}`, query),
    },
  },
}

export default routes
