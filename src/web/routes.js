const createRouteWithQueryParams = (route, query) => {
  if (!query) {
    return route
  }

  const qs = new URLSearchParams(query).toString()

  return `${route}?${qs}`
}

const routes = {
  home: () => "/",
  checkEmail: () => "/checkEmail",
  signUp: () => "/register",
  signIn: () => "/login",
  about: () => "/about_us",
  product: (slug) => `/products/${slug}`,
  categorie: (slug) => `/categories/${slug}`,
  info: {
    terms: () => "/terms",
    privacy: () => "/privacy",
  },
  contact: {
    contact: () => "/contact",
    confirmation: () => "/contact/confirmation",
  },
  checkout: {
    cart: () => "/checkout/cart",
    delivery: () => "/checkout/delivery",
    payment: () => "/checkout/payment",
    confirmation: () => "/checkout/confirmation",
  },
  admin: {
    admin: () => "/admin",
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
    contact: {
      contact: () => "/contact",
    },
    checkout: {
      payment: () => "/payment",
    },
    admin: {
      imageHomePage: {
        collection: () => "/admin/image-home-page",
        changeDisplay: (imageHomePageId) =>
          `/admin/image-home-page/${imageHomePageId}`,
        create: () => `/admin/image-home-page`,
        delete: (imageHomePageId) =>
          `/admin/image-home-page/${imageHomePageId}`,
      },
      materials: {
        collection: () => "/admin/materials/all",
      },
      products: {
        collection: () => "/admin/products/all",
        single: (productId) => `/admin/products/${productId}/single`,
        create: () => `/admin/products/all`,
        update: (productId) => `/admin/products/${productId}/single`,
        delete: (productId) => `/admin/products/${productId}/delete`,
        uploadFile: () => `/admin/products/upload`,
      },
      categories: {
        collection: () => "/admin/categories/all",
        delete: (categoryId) => `/admin/categories/${categoryId}/delete`,
        single: (categoryId) => `/admin/categories/${categoryId}/single`,
        update: (categoryId) => `/admin/categories/${categoryId}/single`,
      },
      users: {
        single: (userId, query) =>
          createRouteWithQueryParams(`/admin/users/${userId}`, query),
        create: () => `/admin/users`,
        update: (userId) => `/admin/users/${userId}`,
        delete: (userId) => `/admin/users/${userId}/delete`,
      },
      orders: {
        collection: () => `/admin/orders`,
        single: (userId) => `/admin/orders/${userId}`,
      },
      dashboard: {
        sales: () => `/sales`,
        salesToday: () => `/salesToday`,
        categoriesSales: (startDate, endDate) =>
          `/categoriesSales?startDate=${startDate}&endDate=${endDate}`,
        averageBasket: (startDate, endDate) =>
          `/averageBasket?startDate=${startDate}&endDate=${endDate}`,
      },
    },
    users: {
      collection: () => `/users`,
      delete: (userId) => `/users/${userId}/delete`,
      checkEmail: (email) => `users/resetPassword/${email}/check`,
      resetPassword: () => `/users/resetPassword/reset`,
      address: {
        collection: (userId, query) =>
          createRouteWithQueryParams(`/users/${userId}/address`, query),
        single: (addressId) => `/users/address/${addressId}/addressSingle`,
        add: (userId) => `/users/${userId}/address`,
      },
      billingAddress: {
        update: (billingAddressId) =>
          `/users/billingAddress/${billingAddressId}/edit`,
        add: (userId) => `/users/${userId}/billingAddress`,
      },
      validate: (token, query) =>
        createRouteWithQueryParams(`/users/confirmation/${token}`, query),
      single: (userId) => `/users/${userId}/personnalData`,
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
      single: (slug) => `/categories/${slug}`,
      collection: () => "/categories",
    },
    products: {
      collection: () => "/products",
      single: (slug) => `/products/${slug}`,
      favorites: (userId, slug) => `/users/${userId}/favorites/${slug}`,
    },
    search: {
      collection: () => "/search",
      searchFilter: () => "/searchFilter",
    },
    orders: {
      collection: (userId) => `/users/${userId}/allOrdersUser`,
      single: (numberOrder) => `/users/order/${numberOrder}`,
      patchQuantity: (numberOrder) => `/users/order/${numberOrder}`,
      deleteProductOrder: (numberOrder, query) =>
        createRouteWithQueryParams(`/users/order/${numberOrder}`, query),
      cancelOrder: (numberOrder) => `/users/order/cancel/${numberOrder}`,
      add: (numberOrder) => `/users/order/${numberOrder}`,
    },
    relOrderProduct: {
      add: () => `/users/order/relOrderProduct`,
    },
  },
}

export default routes
