import routes from "@/web/routes.js"

const resetPassword =
  ({ api }) =>
  async (token, { password }) => {
    try {
      const { data } = await api.patch(routes.api.users.resetPassword(), {
        token, 
        password
      })

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default resetPassword
