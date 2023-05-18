import routes from "@/web/routes.js"

const deleteProductOrder =
  ({ api }) =>
  async (numberOrder, productId, query) => {
    try {
      const { data } = await api.delete(
        routes.api.orders.deleteProductOrder(
          numberOrder,
          {
            productId: productId,
          },
          query
        )
      )

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default deleteProductOrder
