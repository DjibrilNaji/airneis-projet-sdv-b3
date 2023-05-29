import routes from "@/web/routes.js"

const deleteContact =
  ({ api }) =>
  async (contactId) => {
    try {
      const { data } = await api.delete(
        routes.api.contact.contact() + `?contactId=${contactId}`
      )

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default deleteContact
