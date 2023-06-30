import routes from "@/web/routes"
import Image from "next/image"
import Link from "next/link"

const Categories = (props) => {
  const { data } = props

  return (
    <div className="grid gap-12 md:grid-cols-2 md:gap-8 md:px-4 lg:grid-cols-3">
      {data?.map((data) => (
        <Link
          href={routes.categorie(data.slug)}
          key={data.id}
          className="flex items-center justify-center h-60 transition duration-800 hover:scale-105 hover:opacity-90"
        >
          <span className="absolute uppercase font-bold text-xl bg-white text-stone-500 rounded-lg p-1 border-2 border-stone-500">
            {data.name}
          </span>

          <Image
            src={data.urlImage}
            alt="slide 2"
            className="h-full w-full object-cover"
            width="500"
            height="500"
          />
        </Link>
      ))}
    </div>
  )
}

export default Categories
