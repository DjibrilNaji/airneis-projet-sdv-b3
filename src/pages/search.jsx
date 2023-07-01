import { useCallback, useEffect, useState } from "react"
import useAppContext from "@/web/hooks/useAppContext"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import SelectShow from "@/web/components/Admin/SelectAndSearch/SelectShow"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/router"

export async function getServerSideProps(context) {
  const { locale } = context

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "navigation"])),
    },
  }
}

const Search = () => {
  const {
    actions: { getProductsSearchFilter },
  } = useAppContext()

  const router = useRouter()

  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState("")
  const [sortColumn] = useState("id")
  const [order, setOrder] = useState("asc")
  const [limit, setLimit] = useState(10)
  const [searchTerm, setSearchTerm] = useState(router.query.term || "")
  const [material, setMaterial] = useState("")
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const [category, setCategory] = useState("")
  const [materials, setMaterials] = useState([])
  const [categories, setCategories] = useState([])
  const [visibleMaterials, setVisibleMaterials] = useState(5)
  const [visibleCategories, setVisibleCategories] = useState(5)

  const [form, setForm] = useState({
    material: "",
    minPrice: "",
    maxPrice: "",
    category: "",
  })

  const fetchData = useCallback(
    async (page) => {
      const [, data] = await getProductsSearchFilter(
        limit,
        page,
        sortColumn,
        order,
        searchTerm,
        material === "" ? null : material,
        minPrice === "" ? null : minPrice,
        maxPrice === "" ? null : maxPrice,
        category === "" ? null : category
      )

      const totalProducts = data.result.meta.count
      const totalPages = Math.ceil(totalProducts / limit)
      setTotalPages(totalPages)
      setData(data.result.products)
      setMaterials(data.result.materials)
      setCategories(data.result.categories)
    },
    [
      getProductsSearchFilter,
      limit,
      sortColumn,
      order,
      searchTerm,
      material,
      minPrice,
      maxPrice,
      category,
    ]
  )

  useEffect(() => {
    fetchData(currentPage)
  }, [fetchData, currentPage])

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1)
    }
  }

  const updateForm = (e) => {
    const { name, value, type, checked } = e.target

    if (type === "checkbox") {
      setForm((prevState) => ({
        ...prevState,
        [name]: checked
          ? [...prevState[name], value]
          : prevState[name].filter((v) => v !== value),
      }))
    } else {
      setForm((prevState) => ({
        ...prevState,
        [name]: value,
      }))
    }

    if (name === "searchTerm") {
      setSearchTerm(value)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    setMaterial(form.material)
    setMinPrice(form.minPrice)
    setMaxPrice(form.maxPrice)
    setCategory(form.category)
  }

  const handleShowMoreMaterials = () => {
    setVisibleMaterials((prevState) => prevState + 5)
  }

  const handleShowMoreCategories = () => {
    setVisibleCategories((prevState) => prevState + 5)
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1)
    }
  }

  const handleLimitChange = useCallback(
    (e) => {
      setLimit(e.target.value)
      fetchData
    },
    [fetchData]
  )

  return (
    <div>
      <div className="flex">
        <div>
          <div className="bg-gray-100 p-4 rounded-xl m-4 shadow-md">
            <div className="bg-white rounded-xl p-4">
              <input
                type="text"
                name="searchTerm"
                value={searchTerm}
                onChange={updateForm}
                placeholder="Search..."
                className="border-2 border-gray-300 p-2 rounded-md w-full"
              />
            </div>
            <div className="bg-white p-4 rounded-xl mt-2">
              <label>
                Order:
                <select
                  id="order"
                  value={order}
                  onChange={(e) => setOrder(e.target.value)}
                >
                  <option value="asc">ASC</option>
                  <option value="desc">DESC</option>
                </select>
              </label>
            </div>
            <div className="mt-2">
              <SelectShow
                limit={limit}
                handleLimitChange={handleLimitChange}
                name={"products"}
              />
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded-xl m-4 shadow-md">
            <div className="bg-white rounded-xl p-4 mt-2">
              <label>
                Material:
                <div>
                  <label>
                    <input
                      type="radio"
                      name="material"
                      value=""
                      checked={form.material === ""}
                      onChange={updateForm}
                      className="h-5 w-5 border-2 appearance-none checked:bg-stone-500 cursor-pointer"
                    />
                    All
                  </label>
                </div>
                {materials.slice(0, visibleMaterials).map((mat, index) => (
                  <div key={index}>
                    <label>
                      <input
                        type="radio"
                        name="material"
                        value={mat.nameMaterial}
                        checked={form.material.includes(mat.nameMaterial)}
                        onChange={updateForm}
                        className="h-5 w-5 border-2 appearance-none checked:bg-stone-500 cursor-pointer"
                      />
                      {mat.nameMaterial}
                    </label>
                  </div>
                ))}
              </label>
              {materials.length > visibleMaterials && (
                <button onClick={handleShowMoreMaterials}>Show more</button>
              )}
            </div>
            <div className="bg-white rounded-xl p-4 mt-2">
              <label>
                Category:
                <div className="flex flex-wrap">
                  <div>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="category"
                        value=""
                        checked={form.category === ""}
                        onChange={updateForm}
                        className="h-5 w-5 border-2 appearance-none checked:bg-stone-500 cursor-pointer"
                      />
                      All
                    </label>
                  </div>
                </div>
                {categories.slice(0, visibleCategories).map((cat, index) => (
                  <div key={index} className="flex flex-wrap">
                    <div>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="category"
                          value={cat.id}
                          checked={form.category.includes(cat.id)}
                          onChange={updateForm}
                          className="h-5 w-5 border-2 appearance-none checked:bg-stone-500 cursor-pointer"
                        />
                        {cat.name}
                      </label>
                    </div>
                  </div>
                ))}
              </label>
              {categories.length > visibleCategories && (
                <button onClick={handleShowMoreCategories}>Show more</button>
              )}
            </div>
            <div className="bg-white p-4 rounded-xl mt-2">
              <label>
                Min Price:
                <input
                  type="number"
                  id="minPrice"
                  name="minPrice"
                  value={form.minPrice}
                  onChange={updateForm}
                  placeholder="Minimum Price"
                />
              </label>
            </div>
            <div className="bg-white p-4 rounded-xl mt-2">
              <label>
                Max Price:
                <input
                  type="number"
                  id="maxPrice"
                  name="maxPrice"
                  value={form.maxPrice}
                  onChange={updateForm}
                  placeholder="Maximum Price"
                />
              </label>
            </div>
            <button
              className="bg-slate-600 text-white rounded-xl p-4 mt-2 w-full"
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
        <div
          className={`grid gap-12 pb-7 mt-8 m-4 md:grid-cols-2 md:gap-8 md:px-4 lg:grid-cols-3 w-[80vw] `}
        >
          {data?.map((product) => (
            <div key={product.id}>
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="flex items-center justify-center h-60 transition duration-800 hover:scale-105 hover:opacity-90"
              >
                <Image
                  src={product.image[0].urlImage}
                  alt={product.name}
                  className="h-full w-full object-cover rounded-2xl"
                  width="500"
                  height="500"
                />
              </Link>
              <div className="flex">
                {product.name}
                <div className="mx-auto mr-0">{product.price} €</div>
              </div>
            </div>
          ))}

          {data.length === 0 && <p>No results</p>}
        </div>
      </div>
      <div className="flex justify-center items-center m-4">
        {data.length !== 0 && (
          <>
            <button
              className={`px-4 py-2 rounded-md p-4 ml-2 ${
                currentPage === 1
                  ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                  : "bg-slate-600 text-white"
              }`}
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className={`px-4 py-2 rounded-md p-4 ml-2 ${
                currentPage === totalPages
                  ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                  : "bg-slate-600 text-white"
              }`}
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default Search

Search.isPublic = true
