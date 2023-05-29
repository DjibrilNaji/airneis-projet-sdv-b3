import routes from "@/web/routes.js"

const deleteProducts =
  ({ api }) =>
  async (productId) => {
    try {
      const { data } = await api.patch(
        routes.api.admin.products.delete(productId)
      )

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default deleteProducts
