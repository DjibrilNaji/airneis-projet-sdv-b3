import routes from "@/web/routes.js"

const getCategoriesSales =
  ({ api }) =>
  async (startDate, endDate) => {
    try {
      const { data } = await api.get(
        routes.api.admin.dashboard.categoriesSales(startDate, endDate)
      )

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default getCategoriesSales
