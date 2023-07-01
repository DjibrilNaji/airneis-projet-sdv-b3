import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import useAppContext from "@/web/hooks/useAppContext"
import FormError from "@/web/components/Form/FormError"

const SearchBar = () => {
  const router = useRouter()

  const [showSearch, setShowSearch] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [isInputEmpty, setIsInputEmpty] = useState(true)
  const [data, setData] = useState([])
  const [error, setError] = useState(null)

  const searchInputRef = useRef(null)

  const {
    actions: { getProductsSearch },
  } = useAppContext()

  useEffect(() => {
    const fetchProducts = async () => {
      const [err, data] = await getProductsSearch()

      if (err) {
        setError(err)

        return
      }

      setData(data.result)
    }
    fetchProducts()
  }, [getProductsSearch])

  const handleSearchChange = (searchItem) => {
    setSearchTerm(searchItem.target.value)

    searchItem.target.value.trim() == ""
      ? setIsInputEmpty(true)
      : setIsInputEmpty(false)
  }

  const resetSearch = () => {
    setSearchTerm("")
    setShowSearch(false)
  }

  const handleShowSearchClick = () => {
    setShowSearch(!showSearch)

    if (!showSearch) {
      setTimeout(() => {
        searchInputRef.current.focus()
      }, 100)
    }
  }

  const handleSearchSubmit = () => {
    if (!isInputEmpty) {
      router.push(`/search?term=${searchTerm}`)
      resetSearch()
    }
  }

  const highlightText = (text, highlight) => {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"))

    return (
      <span>
        {parts.map((part, i) => (
          <span
            className={`${
              part.toLowerCase() === highlight.toLowerCase() &&
              "font-semibold bg-stone-100 rounded-sm"
            }`}
            key={i}
          >
            {part}
          </span>
        ))}
      </span>
    )
  }

  const filteredProducts = data?.products?.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <>
      {error ? <FormError error={error} /> : ""}
      {showSearch ? (
        <>
          <button>
            <FontAwesomeIcon
              icon={faXmark}
              className="hidden lg:block h-6 text-stone-400 mr-4"
              onClick={() => {
                handleShowSearchClick()
              }}
            />
          </button>
          <form className="hidden lg:block" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search products"
              className={`border-2 border-gray-300 p-2 h-9 rounded-xl ${
                showSearch ? "visible" : "hidden"
              }`}
              value={searchTerm}
              onChange={handleSearchChange}
              ref={searchInputRef}
            />
            {!isInputEmpty && (
              <div className="absolute top-full right-0 mt-2 mr-32 bg-white shadow-lg rounded-xl z-10 w-1/5 tooltip">
                {filteredProducts.length > 0 ? (
                  filteredProducts.slice(0, 4).map((product) => (
                    <Link
                      key={product._id}
                      href={`/products/${product.slug}`}
                      onClick={() => {
                        handleShowSearchClick()
                        resetSearch()
                      }}
                    >
                      <div className="flex shadow-lg rounded-xl m-4 w-13 ml-4 items-center hover:scale-105">
                        <div className="w-3/12 h-16">
                          <Image
                            src={product.image[0].urlImage}
                            alt={product.name}
                            className="object-cover w-full h-full rounded-l-lg"
                            width="100"
                            height="100"
                          />
                        </div>
                        <div className="uppercase  ml-2 truncate w-7/12">
                          <span>{highlightText(product.name, searchTerm)}</span>
                        </div>
                        <div className="mr-1 w-2/12 rounded-r-xl">
                          <span className="text-xs">{product.price} €</span>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="p-2 text-lg text-stone-500">
                    Product not found
                  </div>
                )}
                <Link
                  href={`/search`}
                  onClick={() => {
                    handleShowSearchClick()
                    resetSearch()
                  }}
                >
                  <button
                    type="submit"
                    className="w-full rounded-b-xl p-2 text-white bg-stone-400 hover:bg-stone-300 transition duration-200"
                  >
                    See more
                  </button>
                </Link>
              </div>
            )}
          </form>
          <button
            className="hidden lg:block px-2 py-1"
            onClick={handleShowSearchClick}
          >
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="h-6 text-stone-400"
            />
          </button>
        </>
      ) : (
        <button
          className="hidden lg:block px-2 py-1"
          onClick={handleShowSearchClick}
        >
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="h-6 text-stone-400"
          />
        </button>
      )}
      <Link className="block lg:hidden px-2 py-1" href={`/search`}>
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="h-6 text-stone-400"
        />
      </Link>
    </>
  )
}

export default SearchBar
