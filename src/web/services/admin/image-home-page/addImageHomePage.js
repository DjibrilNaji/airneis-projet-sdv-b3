import routes from "@/web/routes.js"

const addImageHomePage =
  ({ api }) =>
  async (urlImage) => {
    try {
      const { data } = await api.post(routes.api.admin.imageHomePage.create(), {
        urlImage,
      })

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default addImageHomePage
