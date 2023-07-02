import routes from "@/web/routes.js"

const getMaterials =
  ({ api }) =>
  async () => {
    try {
      const { data } = await api.get(routes.api.admin.materials.collection())

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default getMaterials
