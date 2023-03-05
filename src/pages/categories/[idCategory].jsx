import axios from "axios"
import routes from "@/web/routes.js"
import Image from "next/image"
import ListProduct from "@/web/components/ListProduct.jsx"

export const getServerSideProps = async ({ params, req: { url } }) => {
  const idCategory = params.idCategory
  const query = Object.fromEntries(
    new URL(`http://example.com/${url}`).searchParams.entries()
  )

  const { data } = await axios.get(
    `http://localhost:3000/api${routes.api.categories.single(
      idCategory,
      query
    )}`
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
          <div className="h-60 flex items-center justify-center">
            <span className="absolute text-black uppercase font-bold text-2xl z-1">
              {cat.name}
            </span>
            <Image
              src={result.data}
              width={1000}
              height={1000}
              alt={cat.urlImage}
              className="h-80 w-full object-cover"
            />
          </div>
          <p className="p-32 text-xl">{cat.description}</p>
        </div>
      ))}
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
