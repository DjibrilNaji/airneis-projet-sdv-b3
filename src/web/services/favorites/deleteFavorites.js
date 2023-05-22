import routes from "@/web/routes.js"

const deleteFavorite =
  ({ api }) =>
  async (userId, favoriteId) => {
    try {
      const { data } = await api.delete(
        routes.api.users.favorites.single(userId, favoriteId)
      )

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default deleteFavorite
