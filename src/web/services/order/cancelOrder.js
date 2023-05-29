import routes from "@/web/routes.js"

const cancelOrder =
  ({ api }) =>
  async (numberOrder) => {
    try {
      const { data } = await api.patch(
        routes.api.orders.cancelOrder(numberOrder)
      )

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default cancelOrder
