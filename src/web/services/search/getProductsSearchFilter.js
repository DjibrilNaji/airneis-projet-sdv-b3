import routes from "@/web/routes.js"

const getProductsSearchFilter =
  ({ api }) =>
  async (
    limit,
    page,
    sortColumn,
    order,
    searchTerm,
    material,
    minPrice,
    maxPrice,
    category
  ) => {
    try {
      const { data } = await api.get(
        routes.api.search.searchFilter() +
          `?limit=${limit}&page=${page}&sortColumn=${sortColumn}&order=${order}` +
          (searchTerm === null ? "" : `&searchTerm=${searchTerm}`) +
          (material === null ? "" : `&material=${material}`) +
          (minPrice === null ? "" : `&minPrice=${minPrice}`) +
          (maxPrice === null ? "" : `&maxPrice=${maxPrice}`) +
          (category === null ? "" : `&category=${category}`)
      )

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default getProductsSearchFilter
