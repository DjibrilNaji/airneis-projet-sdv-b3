import routes from "@/web/routes.js"

const getSingleAddress =
  ({ api }) =>
  async (addressId) => {
    try {
      const { data } = await api.get(routes.api.users.address.single(addressId))

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default getSingleAddress
