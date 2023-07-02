import Error from "@/pages/_error"
import ProductForm from "@/web/components/Admin/Form/ProductForm"
import LayoutAdmin from "@/web/components/Admin/LayoutAdmin/LayoutAdmin"
import BackButton from "@/web/components/Button/BackButton"
import FormError from "@/web/components/Form/FormError"
import useAppContext, { AppContextProvider } from "@/web/hooks/useAppContext"
import routes from "@/web/routes"
import { useRouter } from "next/router"
import { useCallback, useEffect, useState } from "react"

const CreateProduct = () => {
  const router = useRouter()
  const {
    actions: { getMaterials, getCategories, addNewProduct, addMainImage },
  } = useAppContext()

  useEffect(() => {
    const fetchData = async () => {
      const [err, data] = await getMaterials()

      if (err) {
        setError(err)

        return
      }

      setMaterials(data.result)
      const [erreur, dataCategories] = await getCategories()

      if (erreur) {
        setError(erreur)

        return
      }

      setCategories(dataCategories.result)
    }
    fetchData()
  }, [getCategories, getMaterials])

  const [errorCode, setErrorCode] = useState()
  const [error, setError] = useState(null)
  const [materials, setMaterials] = useState([])
  const [categories, setCategories] = useState([])
  const [file, setFile] = useState(null)
  const [urlImage, setUrlImage] = useState(null)

  const handleFileInput = (e) => {
    setFile(e.target.files[0])

    if (e.target.files[0]) {
      setUrlImage(e.target.files[0].name)
    }
  }

  const handleSubmit = useCallback(
    async (values) => {
      const addProduct = await addNewProduct(values, urlImage)
      const formData = new FormData()
      formData.append("file", file)
      const uploadImage = await addMainImage(formData)

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
    [addNewProduct, urlImage, file, addMainImage, router]
  )

  if (errorCode) {
    return <Error statusCode={errorCode} />
  }

  return (
    <>
      {error ? <FormError error={error} /> : ""}
      <div className="w-full mx-auto">
        <BackButton />
        <h1 className="font-semibold text-2xl mb-10 text-center uppercase">
          Add Product
        </h1>

        <div className="flex flex-wrap justify-center">
          <ProductForm
            categories={categories}
            onSubmit={handleSubmit}
            onChange={handleFileInput}
            materials={materials}
          />
        </div>
      </div>
    </>
  )
}

CreateProduct.getLayout = function (page) {
  return (
    <AppContextProvider>
      <LayoutAdmin>{page}</LayoutAdmin>
    </AppContextProvider>
  )
}

export default CreateProduct
