import routes from "@/web/routes.js"

const updateProduct =
  ({ api }) =>
  async (
    productId,
    { name, description, price, stock, highlander, slug, materials }
  ) => {
    if (highlander === "") {
      highlander = false
    }

    try {
      const { data } = await api.patch(
        routes.api.admin.products.update(productId),
        {
          name,
          description,
          price,
          stock,
          highlander,
          slug,
          materials,
        }
      )

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default updateProduct
