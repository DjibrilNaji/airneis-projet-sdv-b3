import routes from "@/web/routes"

const addRelOrderProduct =
  ({ api }) =>
  async ({ orderId, productId, quantity }) => {
    try {
      const { data } = await api.post(routes.api.relOrderProduct.add(), {
        orderId,
        productId,
        quantity,
      })

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default addRelOrderProduct
