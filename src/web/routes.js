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
  product: (slug) => `/products/${slug}`,
  categorie: (slug) => `/categories/${slug}`,
  admin: {
    users: {
      single: (userId) => `/admin/users/${userId}/view`,
      collection: () => "/admin/users",
      create: () => "/admin/users/create",
    },
    products: {
      single: (productId) => `/admin/products/${productId}/view`,
      collection: () => "/admin/products",
      create: () => "/admin/products/create",
    },
    orders: {
      single: (orderId) => `/admin/orders/${orderId}/view`,
    },
  },
  users: {
    single: (userId) => `/users/${userId}/myAccount`,
    addressSingle: (addressId) => `/users/address/${addressId}/editAddress`,
    addAddress: (userId) => `/users/${userId}/addAddress`,
    addBillingAddress: (userId) => `/users/${userId}/addBillingAddress`,
    favorites: (idUser) => `/users/${idUser}/favorites`,
  },
  orders: {
    collection: (idUser) => `/users/${idUser}/allOrdersUser`,
    single: (numberOrder) => `/users/order/${numberOrder}`,
  },
  api: {
    signUp: () => "/register",
    signIn: () => "/login",
    contact: () => "/contact",
    admin: {
      materials: {
        collection: () => "/admin/materials/all",
      },
      products: {
        collection: () => "/admin/products/all",
        single: (productId, query) =>
          createRouteWithQueryParams(
            `/admin/products/${productId}/single`,
            query
          ),
        create: () => `/admin/products/all`,
        update: (productId) => `/admin/products/${productId}/single`,
        delete: (productId) => `/admin/products/${productId}/delete`,
        uploadFile: () => `/admin/products/upload`,
      },
      categories: () => "/admin/categories",
      users: {
        single: (userId, query) =>
          createRouteWithQueryParams(`/admin/users/${userId}`, query),
        create: () => `/admin/users`,
        update: (userId) => `/admin/users/${userId}`,
      },
      orders: {
        collection: () => `/admin/orders`,
        single: (userId) => `/admin/orders/${userId}`,
      },
    },
    users: {
      address: {
        collection: (userId, query) =>
          createRouteWithQueryParams(`/users/${userId}/address`, query),
        single: (addressId, query) =>
          createRouteWithQueryParams(
            `/users/address/${addressId}/addressSingle`,
            query
          ),
        add: (userId) => `/users/${userId}/address`,
      },
      billingAddress: {
        update: (billingAddressId) =>
          `/users/billingAddress/${billingAddressId}/edit`,
        add: (userId) => `/users/${userId}/billingAddress`,
      },
      validate: (token, query) =>
        createRouteWithQueryParams(`/users/confirmation/${token}`, query),
      single: (userId, query) =>
        createRouteWithQueryParams(`/users/${userId}/personnalData`, query),
      update: (userId) => `/users/${userId}/personnalData`,
      favorites: {
        collection: (userId) => `/users/${userId}/favorites`,
        single: (userId, query) =>
          createRouteWithQueryParams(`/users/${userId}/favorites`, query),
      },
    },
    categoriesAndProducts: {
      collection: () => "/categories-and-products",
    },
    categories: {
      single: (slug, query) =>
        createRouteWithQueryParams(`/categories/${slug}`, query),
      collection: () => "/categories",
    },
    products: {
      collection: () => "/products",
      single: (slug, query) =>
        createRouteWithQueryParams(`/products/${slug}`, query),
    },
    search: {
      collection: (query) => createRouteWithQueryParams(`/search`, query),
    },
    orders: {
      collection: (userId, query) =>
        createRouteWithQueryParams(`/users/${userId}/allOrdersUser`, query),
      single: (numberOrder, query) =>
        createRouteWithQueryParams(`/users/order/${numberOrder}`, query),
      patchQuantity: (numberOrder) => `/users/order/${numberOrder}`,
      deleteProductOrder: (numberOrder, query) =>
        createRouteWithQueryParams(`/users/order/${numberOrder}`, query),
      cancelOrder: (numberOrder, query) =>
        createRouteWithQueryParams(`/users/order/cancel/${numberOrder}`, query),
    },
  },
}

export default routes
