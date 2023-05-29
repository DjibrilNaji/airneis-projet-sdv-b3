import routes from "@/web/routes.js"

const getSingleCategory =
  ({ api }) =>
  async (slug) => {
    try {
      const { data } = await api.get(routes.api.categories.single(slug))

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default getSingleCategory
