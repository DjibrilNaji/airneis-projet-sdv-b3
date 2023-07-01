import routes from "@/web/routes.js"

const getAllAddress =
  ({ api }) =>
  async (userId, order) => {
    try {
      const { data } = await api.get(
        routes.api.users.address.collection(userId, order && { order })
      )

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default getAllAddress
