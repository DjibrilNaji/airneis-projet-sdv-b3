import EditProductForm from "@/web/components/Admin/Form/EditProductForm"
import LayoutAdmin from "@/web/components/Admin/LayoutAdmin/LayoutAdmin"
import BackButton from "@/web/components/BackButton"
import FormError from "@/web/components/FormError"
import useAppContext from "@/web/hooks/useAppContext"
import routes from "@/web/routes"
import {
  faCartArrowDown,
  faCheck,
  faEdit,
  faPhotoFilm,
  faPlus,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import Link from "next/link"
import { useCallback, useEffect, useState } from "react"

export const getServerSideProps = async ({ params }) => {
  const productId = params.productId

  return {
    props: {
      productId,
    },
  }
}

const ViewUser = (props) => {
  const { productId } = props

  const {
    actions: { getSingleProduct, updateProduct, getMaterials },
  } = useAppContext()

  useEffect(() => {
    const fetchData = async () => {
      const [err, data] = await getMaterials()

      if (err) {
        setError(err)

        return
      }

      setMaterials(data.result)
      const [erreur, dataProduct] = await getSingleProduct(productId)

      if (erreur) {
        setError(erreur)

        return
      }

      setProduct(dataProduct.result.product[0])
      setImage(dataProduct.result.product[0].image)
    }
    fetchData()
  }, [getMaterials, getSingleProduct, productId])

  const [error, setError] = useState(null)
  const [toggleUpdateProduct, setToggleUpdateProduct] = useState(true)
  const [product, setProduct] = useState([])
  const [image, setImage] = useState([])
  const [materials, setMaterials] = useState([])

  const handleSubmit = useCallback(
    async (values) => {
      const [err, data] = await updateProduct(productId, values)

      if (err) {
        setError(err)

        return
      }

      setProduct(data.result)
      setToggleUpdateProduct(!toggleUpdateProduct)
    },
    [productId, toggleUpdateProduct, updateProduct]
  )

  return (
    <div>
      {error ? <FormError error={error} /> : ""}
      <BackButton />
      <div className="bg-stone-100 mx-2 my-6">
        <div className="flex items-center justify-between border-b-4 border-red-500 px-3 py-4 ">
          <div className="flex items-center gap-4 ">
            <FontAwesomeIcon
              icon={faCartArrowDown}
              className="h-6 text-stone-400"
            />
            <h1 className="font-bold text-xl uppercase">Informations </h1>

            {product.isDelete ? (
              <span className="italic text-red-500 text-lg">
                (Product delete : id {product.id})
              </span>
            ) : (
              <span className="italic text-green-500 text-lg">
                (Product active : id {product.id})
              </span>
            )}
          </div>
          {!product.isDelete && (
            <button
              className="flex justify-end text-stone-500 font-bold text-lg rounded"
              onClick={() => setToggleUpdateProduct(!toggleUpdateProduct)}
              title={
                toggleUpdateProduct ? "Update Product" : "Finish modifications"
              }
            >
              <FontAwesomeIcon
                icon={toggleUpdateProduct ? faEdit : faCheck}
                className="h-7"
              />
            </button>
          )}
        </div>

        <EditProductForm
          initialValues={product}
          onSubmit={handleSubmit}
          active={toggleUpdateProduct}
          material={materials}
        />
      </div>
      <div className="bg-stone-100 mx-2 my-6">
        <div className="flex items-center justify-between border-b-4 border-red-500 px-3 py-4">
          <div className="flex items-center gap-4 ">
            <FontAwesomeIcon
              icon={faPhotoFilm}
              className="h-6 text-stone-400"
            />
            <h1 className="font-bold text-xl uppercase">Images Product </h1>
          </div>

          {!product.isDelete && (
            <Link href={routes.admin.products.create()}>
              <button
                className="flex justify-end text-stone-500 font-bold text-lg rounded"
                title="Add Image Product"
              >
                <FontAwesomeIcon icon={faPlus} className="h-7" />
              </button>
            </Link>
          )}
        </div>
        <div className="flex">
          {image.map((imageProduct) => (
            <Image
              key={imageProduct.id}
              src={imageProduct.urlImage}
              alt={`slide ${imageProduct.id}`}
              className={`w-24 h-24 object-cover rounded-xl transition-opacity ease-linear duration-300 m-4`}
              width="500"
              height="500"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

ViewUser.getLayout = function (page) {
  return <LayoutAdmin>{page}</LayoutAdmin>
}

export default ViewUser
