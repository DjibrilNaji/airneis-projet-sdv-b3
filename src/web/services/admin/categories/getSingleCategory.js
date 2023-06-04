import routes from "@/web/routes.js"

const getSingleCategory =
  ({ api }) =>
  async (categoryId) => {
    try {
      const { data } = await api.get(
        routes.api.admin.categories.single(categoryId)
      )

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default getSingleCategory
