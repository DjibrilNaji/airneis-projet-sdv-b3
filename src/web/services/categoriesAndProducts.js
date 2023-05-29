import routes from "@/web/routes.js"

const categoriesAndProducts =
  ({ api }) =>
  async () => {
    try {
      const { data } = await api.get(
        routes.api.categoriesAndProducts.collection()
      )

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default categoriesAndProducts
