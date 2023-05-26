import routes from "@/web/routes.js"

const addNewProduct =
  ({ api }) =>
  async (
    { name, description, price, stock, highlander, slug, materials },
    urlImage
  ) => {
    if (highlander === "") {
      highlander = false
    }

    try {
      const { data } = await api.post(
        routes.api.admin.products.create(),
        {
          name,
          description,
          price,
          stock,
          highlander,
          slug,
          materials,
          urlImage,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default addNewProduct
