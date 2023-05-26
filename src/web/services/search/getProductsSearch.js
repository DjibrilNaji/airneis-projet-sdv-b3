import routes from "@/web/routes.js"

const getProductsSearch =
  ({ api }) =>
  async () => {
    try {
      const { data } = await api.get(routes.api.products.collection())

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default getProductsSearch
