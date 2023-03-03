import Link from "next/link"
import Image from "next/image"
import routes from "../routes"

const ListProduct = (props) => {
  const { product } = props

  return (
    <div>
      <Link
        href={routes.product(product.id)}
        className="h-60 flex justify-center items-center"
      >
        <span className="absolute text-gray-600 uppercase font-bold text-2xl z-1">
          {product.name}
        </span>
        <Image
          src={product.urlImage}
          alt={product.name}
          className="h-full w-full object-cover"
          width={1000}
          height={1000}
        />
      </Link>
      <div className="flex flex-wrap justify-around text-xl font-semibold">
        <p>Price : </p>
        <p>{product.price} €</p>
      </div>
    </div>
  )
}

export default ListProduct
