import Error from "@/pages/_error"
import ProductForm from "@/web/components/Admin/Form/ProductForm"
import BackButton from "@/web/components/BackButton"
import config from "@/web/config"
import routes from "@/web/routes"
import axios from "axios"
import { useRouter } from "next/router"
import { useCallback, useState } from "react"

export const getServerSideProps = async () => {
  const { data } = await axios.get(
    `${config.api.baseURL}${routes.api.categories.collection()}`
  )

  const materials = await axios.get(
    `${config.api.baseURL}${routes.api.admin.materials.collection()}`
  )

  return {
    props: {
      categories: data,
      materials: materials.data.result,
    },
  }
}

const CreateProduct = (props) => {
  const {
    categories: { result },
    materials,
  } = props
  const router = useRouter()

  const [errorCode, setErrorCode] = useState()

  const [file, setFile] = useState(null)
  const [urlImage, setUrlImage] = useState(null)

  const handleFileInput = (e) => {
    setFile(e.target.files[0])
    setUrlImage(e.target.files[0].name)
  }

  const handleSubmit = useCallback(
    async ({
      name,
      description,
      price,
      quantity,
      highlander,
      slug,
      categorieId,
      materials,
    }) => {
      if (highlander === "") {
        highlander = false
      }

      const addProduct = await axios.post(
        `${config.api.baseApiURL}${routes.api.admin.products.create()}`,
        {
          name,
          description,
          price,
          quantity,
          highlander,
          slug,
          categorieId,
          urlImage,
          materials,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      const formData = new FormData()
      formData.append("file", file)
      const uploadImage = await axios.post(
        `${config.api.baseApiURL}${routes.api.admin.products.uploadFile()}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )

      Promise.allSettled([addProduct, uploadImage])
        .then((results) => {
          const [productResult, imageResult] = results

          if (
            productResult.status === "fulfilled" &&
            imageResult.status === "fulfilled"
          ) {
            router.push(routes.admin.products.collection())
          } else {
            setErrorCode("404")
          }
        })
        .catch((error) => {
          setErrorCode(error.response.status)
        })
    },
    [file, urlImage, router]
  )

  if (errorCode) {
    return <Error statusCode={errorCode} />
  }

  return (
    <>
      <div className="w-full mx-auto">
        <BackButton />
        <h1 className="font-semibold text-2xl mb-10 text-center uppercase">
          Add Product
        </h1>

        <div className="flex flex-wrap justify-center">
          <ProductForm
            categories={result}
            onSubmit={handleSubmit}
            onChange={handleFileInput}
            materials={materials}
          />
        </div>
      </div>
    </>
  )
}

export default CreateProduct
