import axios from "axios"
import routes from "@/web/routes.js"
import Image from "next/image"
import ListProduct from "@/web/components/ListProduct.jsx"
import config from "@/web/config"

export const getServerSideProps = async ({ params, req: { url } }) => {
  const slugCategory = params.slug
  const query = Object.fromEntries(
    new URL(`http://example.com/${url}`).searchParams.entries()
  )

  const { data } = await axios.get(
    `${config.api.baseURL}${routes.api.categories.single(slugCategory, query)}`
  )

  return {
    props: {
      category: data,
    },
  }
}

const Category = (props) => {
  const {
    category: { result },
  } = props

  return (
    <>
      {result.category.map((cat) => (
        <div key={cat.id}>
          <div className="m-4 h-96 flex justify-center items-center relative">
            <Image
              src={result.data}
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
        {result.products.map((product) => (
          <ListProduct key={product.id} product={product}></ListProduct>
        ))}
      </div>
    </>
  )
}

Category.isPublic = true

export default Category
