import routes from "@/web/routes.js"

const getSales =
  ({ api }) =>
  async () => {
    try {
      const { data } = await api.get(routes.api.admin.dashboard.sales())

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default getSales
