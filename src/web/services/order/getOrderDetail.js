import routes from "@/web/routes.js"

const getOrderDetail =
  ({ api }) =>
  async (numberOrder) => {
    try {
      const { data } = await api.get(routes.api.orders.single(numberOrder))

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default getOrderDetail
