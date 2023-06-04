import routes from "@/web/routes.js"

const addNewOrder =
  ({ api }) =>
  async (
    numberOrder,
    { userId, addressId, price, amount_tva, total_price }
  ) => {
    try {
      const { data } = await api.post(routes.api.orders.add(numberOrder), {
        userId,
        addressId,
        price,
        amount_tva,
        total_price,
      })

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default addNewOrder
