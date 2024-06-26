import routes from "@/web/routes.js"

const changeDisplayImageHomePage =
  ({ api }) =>
  async (imageHomePageId) => {
    try {
      const { data } = await api.patch(
        routes.api.admin.imageHomePage.changeDisplay(imageHomePageId)
      )

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default changeDisplayImageHomePage
