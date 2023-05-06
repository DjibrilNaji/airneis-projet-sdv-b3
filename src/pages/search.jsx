import { useRouter } from "next/router"
import { useCallback, useEffect, useState } from "react"
import axios from "axios"
import config from "@/web/config"
import routes from "@/web/routes"
import Link from "next/link"
import Image from "next/image"

const Search = () => {
  const router = useRouter()
  const [data, setData] = useState([])
  const [searchTerm, setSearchTerm] = useState(router.query.term || "")
  const [inputValue, setInputValue] = useState("")

  const fetchData = useCallback(async () => {
    const result = await axios.get(
      `${config.api.baseApiURL}${routes.api.products.collection()}`
    )
    setData(result.data.result)
  }, [])

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSearchTerm(inputValue)
    router.push({ pathname: router.pathname, query: { term: inputValue } })
  }

  useEffect(() => {
    fetchData()
  }, [fetchData])

  useEffect(() => {
    setSearchTerm(router.query.term || "")
    setInputValue(router.query.term || "")
  }, [router.query.term])

  const filteredProducts = data?.products?.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const countProducts = filteredProducts?.length

  return (
    <>
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
              type="submit"
              className="bg-slate-600 text-white px-4 py-2 rounded-md p-4 ml-2"
            >
              Search
            </button>
          </form>
        </div>

        {countProducts > 0 && (
          <div className="flex justify-center items-center mt-4">
            <p className="text-center">
              {countProducts} results for :{" "}
              <span className="font-bold">"{searchTerm}"</span>
            </p>
          </div>
        )}
      </div>

      {countProducts > 0 ? (
        <div
          className={`grid gap-12 pb-7 mt-8 m-4 md:grid-cols-2 md:gap-8 md:px-4 lg:grid-cols-3`}
        >
          {filteredProducts.map((product) => (
            <Link
              key={product._id}
              href={`/products/${product.slug}`}
              className="flex items-center justify-center h-60 transition duration-800 hover:scale-105 hover:opacity-90"
            >
              <span className="absolute uppercase font-bold text-2xl bg-white text-stone-500 rounded-lg p-1 border-2 border-stone-500">
                {product.name}
              </span>
              <Image
                src={product.image[0].urlImage}
                alt={product.name}
                className="h-full w-full object-cover rounded-2xl"
                width="500"
                height="500"
              />
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full">
          <p className="text-xl font-semibold mb-4 mt-4">No results found</p>
          <h2 className="text-2xl font-semibold mb-4">Other products:</h2>
          <div className="grid gap-12 pb-7 md:grid-cols-2 md:gap-8 md:px-4 lg:grid-cols-3">
            {data?.products?.slice(0, 5).map((product) => (
              <Link
                key={product._id}
                href={`/products/${product.slug}`}
                className="flex items-center justify-center h-60 transition duration-800 hover:scale-105 hover:opacity-90"
              >
                <span className="absolute uppercase font-bold text-2xl bg-white text-stone-500 rounded-lg p-1 border-2 border-stone-500">
                  {product.name}
                </span>
                <Image
                  src={product.image[0].urlImage}
                  alt={product.name}
                  className="h-full w-full object-cover rounded-2xl"
                  width="500"
                  height="500"
                />
              </Link>
            ))}
            <Link
              href="/products"
              className="flex items-center justify-center h-60 transition duration-800 hover:scale-105 hover:opacity-90"
            >
              <span className="absolute uppercase font-bold text-2xl bg-white text-stone-500 rounded-lg p-1 border-2 border-stone-500">
                See more
              </span>
              <div className="h-full w-full object-cover rounded-2xl bg-gray-200" />
            </Link>
          </div>
        </div>
      )}
    </>
  )
}

export default Search

Search.isPublic = true
