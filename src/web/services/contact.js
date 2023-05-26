import routes from "@/web/routes"

const contact =
  ({ api }) =>
  async ({ email, subject, message }) => {
    try {
      const { data } = await api.post(routes.api.contact.contact(), {
        email,
        subject,
        message,
      })

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default contact
