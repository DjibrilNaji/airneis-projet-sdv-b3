import routes from "@/web/routes.js"

const signUp =
  ({ api }) =>
  async ({ userName, firstName, lastName, email, password }) => {
    try {
      const { data } = await api.post(routes.api.signUp(), {
        userName,
        firstName,
        lastName,
        email,
        password,
      })

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default signUp
