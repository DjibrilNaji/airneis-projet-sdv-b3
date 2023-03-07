import Link from "next/link"
import Image from "next/image"
import routes from "../routes"

const ListProduct = (props) => {
  const { product } = props

  return (
    <div>
      <Link
        href={routes.product(product.id)}
        className="h-60 flex justify-center items-center relative"
      >
        <span className="absolute uppercase font-bold top-10 text-2xl bg-white text-stone-500 rounded-lg p-1 border-2 border-stone-500 px-2">
          {product.name}
        </span>
        <Image
          src={product.urlImage}
          alt={product.name}
          className="h-full w-full object-cover rounded-2xl"
          width={1000}
          height={1000}
        />
        {product.quantity > 0 ? (
        <div className="flex absolute uppercase font-bold top-44
         text-2xl bg-white text-stone-500 rounded-lg p-1 border-2 border-stone-500 px-2">
        <p className="pr-4">Price : </p>
        <p>{product.price.toFixed(2)} €</p>
      </div>
      ) : (
        <div className="flex absolute uppercase font-bold top-44
         text-2xl bg-white text-red-500 rounded-lg p-1 border-2 border-red-500 px-2">
        <p> Out Of Stock </p>
      </div>
      )}
      </Link>
      
    </div>
  )
}

export default ListProduct
