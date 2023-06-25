import routes from "@/web/routes.js"

const getRelMaterialProduct =
  ({ api }) =>
  async (productId) => {
    try {
      const { data } = await api.get(
        routes.api.admin.materials.relMaterialProduct({ productId: productId })
      )

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default getRelMaterialProduct
