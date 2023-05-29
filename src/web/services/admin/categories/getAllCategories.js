import routes from "@/web/routes.js"

const getAllCategories =
  ({ api }) =>
  async (limit, page, sortColumn, order, searchTerm) => {
    try {
      const { data } = await api.get(
        routes.api.admin.categories.collection() +
          `?limit=${limit}&page=${page}&sortColumn=${sortColumn}&order=${order}` +
          (searchTerm === null ? "" : `&searchTerm=${searchTerm}`)
      )

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default getAllCategories
