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
  api: {
    signUp: () => "/register",
    signIn: () => "/login",
    categories: {
      single: (idCategory, query) =>
        createRouteWithQueryParams(`/categories/${idCategory}`, query),
    },
  },
}

export default routes
