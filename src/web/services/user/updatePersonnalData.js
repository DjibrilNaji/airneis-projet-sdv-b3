import routes from "@/web/routes.js"

const updatePersonnalData =
  ({ api }) =>
  async (userId, { firstName, lastName, email, userName }) => {
    try {
      const { data } = await api.patch(routes.api.users.update(userId), {
        firstName,
        lastName,
        email,
        userName,
      })

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default updatePersonnalData
