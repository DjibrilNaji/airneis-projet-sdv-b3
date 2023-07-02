import routes from "@/web/routes.js"

const deleteUsers =
  ({ api }) =>
  async (userId) => {
    try {
      const { data } = await api.patch(routes.api.admin.users.delete(userId))

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default deleteUsers
