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
    posts: {
      collection: (query) => createRouteWithQueryParams("/posts", query),
      single: (postId, query) =>
        createRouteWithQueryParams(`/posts/${postId}`, query),
    },
  },
}

export default routes
