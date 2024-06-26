import routes from "@/web/routes.js"

const getSingleFavorite =
  ({ api }) =>
  async (userId, slug) => {
    try {
      const { data } = await api.get(
        routes.api.products.favorites(userId, slug)
      )

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default getSingleFavorite
