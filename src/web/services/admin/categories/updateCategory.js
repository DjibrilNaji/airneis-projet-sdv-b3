import routes from "@/web/routes.js"

const updateCategory =
  ({ api }) =>
  async (categoryId, { name, description, slug }) => {
    try {
      const { data } = await api.patch(
        routes.api.admin.categories.update(categoryId),
        { name, description, slug }
      )

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default updateCategory
