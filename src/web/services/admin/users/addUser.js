import routes from "@/web/routes.js"

const updateUsers =
  ({ api }) =>
  async ({ userName, firstName, lastName, email, password, isAdmin }) => {
    try {
      const { data } = await api.post(routes.api.admin.users.create(), {
        userName,
        firstName,
        lastName,
        email,
        password,
        isAdmin,
      })

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default updateUsers
