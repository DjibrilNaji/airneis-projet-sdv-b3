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
    },
  },
}

export default routes
