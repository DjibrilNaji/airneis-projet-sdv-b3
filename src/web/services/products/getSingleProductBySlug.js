import routes from "@/web/routes.js"

const getSingleProductBySlug =
  ({ api }) =>
  async (productSlug) => {
    try {
      const { data } = await api.get(routes.api.products.single(productSlug))

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default getSingleProductBySlug
