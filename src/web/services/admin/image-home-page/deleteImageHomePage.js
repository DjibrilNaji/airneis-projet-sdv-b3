import routes from "@/web/routes.js"

const deleteImageHomePage =
  ({ api }) =>
  async (imageHomePageId) => {
    try {
      const { data } = await api.delete(
        routes.api.admin.imageHomePage.delete(imageHomePageId)
      )

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default deleteImageHomePage
