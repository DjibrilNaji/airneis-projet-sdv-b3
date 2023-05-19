import routes from "@/web/routes.js"

const addMainImage =
  ({ api }) =>
  async (formData) => {
    try {
      const { data } = await api.post(
        routes.api.admin.products.uploadFile(),
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default addMainImage
