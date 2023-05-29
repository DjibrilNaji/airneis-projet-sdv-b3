import routes from "@/web/routes.js"

const patchOrderQuantity =
  ({ api }) =>
  async (numberOrder, productId, quantity) => {
    try {
      const { data } = await api.patch(
        routes.api.orders.patchQuantity(numberOrder),
        {
          productId,
          quantity,
        }
      )

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default patchOrderQuantity
