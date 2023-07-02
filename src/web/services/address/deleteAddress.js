import routes from "@/web/routes.js"

const deleteAddress =
  ({ api }) =>
  async (addressId) => {
    try {
      const { data } = await api.delete(
        routes.api.users.address.single(addressId)
      )

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default deleteAddress
