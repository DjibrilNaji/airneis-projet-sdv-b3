import routes from "@/web/routes.js"

const checkEmail =
  ({ api }) =>
  async ({email}) => {
    try {
      const { data } = await api.get(
        routes.api.users.checkEmail(email)
      )

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default checkEmail