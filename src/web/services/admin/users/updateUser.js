import routes from "@/web/routes.js"

const updateUsers =
  ({ api }) =>
  async (
    userId,
    { userName, firstName, lastName, email, password, isAdmin }
  ) => {
    try {
      const { data } = await api.patch(routes.api.admin.users.update(userId), {
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
