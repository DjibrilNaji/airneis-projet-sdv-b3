import routes from "@/web/routes.js"

const deleteCategory =
  ({ api }) =>
  async (categoryId) => {
    try {
      const { data } = await api.patch(
        routes.api.admin.categories.delete(categoryId)
      )

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default deleteCategory
