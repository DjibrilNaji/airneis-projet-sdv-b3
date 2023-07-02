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

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
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
    <>
      {error ? <FormError error={error} /> : ""}
      <div className="flex-col mt-10">
        <div className="flex justify-center items-center">
          <form onSubmit={handleSubmit} className="flex md:w-1/2 lg:w-1/2">
            <input
              type="text"
              placeholder="Search products"
              className="border-2 border-gray-300 p-2 rounded-md w-full"
              value={inputValue}
              onChange={handleInputChange}
            />
            <button
              className="bg-slate-600 text-white rounded-xl p-4 mt-2 w-full"
              type="submit"
              className="bg-slate-600 text-white px-4 py-2 rounded-md p-4 ml-2"
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
