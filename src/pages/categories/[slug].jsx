import Image from "next/image"
import ListProduct from "@/web/components/ListProduct.jsx"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import useAppContext from "@/web/hooks/useAppContext"
import { useEffect, useState } from "react"
import FormError from "@/web/components/FormError"

export const getServerSideProps = async ({ locale, params }) => {
  const slug = params.slug

  return {
    props: {
      slug: slug,
      ...(await serverSideTranslations(locale, ["common", "navigation"])),
    },
  }
}

const Category = (props) => {
  const { slug } = props
  const {
    actions: { getSingleCategorie },
  } = useAppContext()

  useEffect(() => {
    const fetchData = async () => {
      const [err, data] = await getSingleCategorie(slug)

      if (err) {
        setError(err)

        return
      }

      setCategorie(data.result.category)
      setProducts(data.result.products)
      setImage(data.result.data)
    }
    fetchData()
  }, [getSingleCategorie, slug])

  const [error, setError] = useState(null)
  const [categorie, setCategorie] = useState([])
  const [products, setProducts] = useState([])
  const [image, setImage] = useState()

  return (
    <>
      {error ? <FormError error={error} /> : ""}
      {categorie.map((cat) => (
        <div key={cat.id}>
          <div className="m-4 h-96 flex justify-center items-center relative">
            <Image
              src={image}
              width={1000}
              height={1000}
              alt={cat.urlImage}
              className="w-full h-full object-cover rounded-xl absolute"
            />
            <span className="absolute uppercase font-bold text-2xl bg-white text-stone-500 rounded-lg p-1 border-2 border-stone-500 px-2">
              {cat.name}
            </span>
          </div>
          <p className="p-16 text-2xl">{cat.description}</p>
        </div>
      ))}
      <div className="flex justify-center bg-stone-500 my-10">
        <p className="p-6 font-bold text-white text-xl">
          All products in this category
        </p>
      </div>
      <div className="grid px-2 gap-7 md:pb-10 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ListProduct key={product.id} product={product}></ListProduct>
        ))}
      </div>
    </>
  )
}

Category.isPublic = true

export default Category
