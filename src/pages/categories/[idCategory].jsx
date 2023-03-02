import axios from "axios"
import routes from "@/web/routes.js"
import Image from "next/image"

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

  return result.category.map((cat) => (
    <div key={cat.id} className="absolute top-28">
      <div className="h-60 flex items-center justify-center">
        <span className="absolute text-black uppercase font-bold text-2xl">
          {cat.categoryName}
        </span>
        <Image
          src={result.data}
          width={500}
          height={500}
          alt={cat.urlImage}
          className="h-80 w-full object-cover"
        />
      </div>
      <p className="m-20">{cat.description}</p>
    </div>
  ))
}

Category.isPublic = true

export default Category
