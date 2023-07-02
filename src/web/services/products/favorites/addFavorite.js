import routes from "@/web/routes.js"

const addFavorite =
  ({ api }) =>
  async (userId, productId) => {
    try {
      const { data } = await api.post(
        routes.api.users.favorites.single(userId, {
          productId: productId,
        })
      )

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default addFavorite
