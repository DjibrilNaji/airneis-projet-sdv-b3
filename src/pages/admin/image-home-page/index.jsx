import Error from "@/pages/_error"
import ConfirmDelete from "@/web/components/Admin/ConfirmDelete"
import LayoutAdmin from "@/web/components/Admin/LayoutAdmin/LayoutAdmin"
import Title from "@/web/components/Admin/Title"
import CenterItem from "@/web/components/CenterItem"
import Dialog from "@/web/components/Dialog"
import FormError from "@/web/components/FormError"
import useAppContext, { AppContextProvider } from "@/web/hooks/useAppContext"
import {
  faPlus,
  faTimes,
  faTrash,
  faUpload,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import { useCallback, useEffect, useState } from "react"

const ImageHomePage = () => {
  const {
    actions: {
      getImagesHomePage,
      changeDisplayImageHomePage,
      addMainImage,
      addImageHomePage,
      deleteImageHomePage,
    },
  } = useAppContext()

  const [image, setImage] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [error, setError] = useState("")
  const [toggleDelete, setToggleDelete] = useState(false)
  const [imageIdToRemove, setImageIdToRemove] = useState(false)

  const fetchData = useCallback(async () => {
    const [err, data] = await getImagesHomePage()

    if (err) {
      setError(err)

      return
    }

    setImage(data.imageHomePage)
  }, [getImagesHomePage])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const imagesDisplay = image.reduce((acc, img) => acc + img.display, 0)

  const handleChangeDisplay = useCallback(
    async (imageHomePageId) => {
      const [err] = await changeDisplayImageHomePage(imageHomePageId)

      if (err) {
        setError(err)

        return
      }

      fetchData()
    },
    [changeDisplayImageHomePage, fetchData]
  )

  const [file, setFile] = useState(null)
  const [urlImage, setUrlImage] = useState(null)

  const handleFileInput = (e) => {
    setFile(e.target.files[0])

    if (e.target.files[0]) {
      setUrlImage(e.target.files[0].name)
    }
  }

  const [errorCode, setErrorCode] = useState()

  const handleSubmit = useCallback(async () => {
    const addImage = await addImageHomePage(urlImage)
    const formData = new FormData()
    formData.append("file", file)
    const uploadImage = await addMainImage(formData)

    Promise.allSettled([addImage, uploadImage])
      .then((results) => {
        const [imageHomePageResult, imageResult] = results

        if (
          imageHomePageResult.status === "fulfilled" &&
          imageResult.status === "fulfilled"
        ) {
          setIsOpen(true)
          setTimeout(() => setIsOpen(false), 2500)
          setUrlImage(null)
          fetchData()
        } else {
          setErrorCode("404")
        }
      })
      .catch((error) => {
        setErrorCode(error.response.status)
      })
  }, [urlImage, file, addMainImage, addImageHomePage, fetchData])

  const handleDelete = useCallback(
    async (imageHomePageId) => {
      const [err] = await deleteImageHomePage(imageHomePageId)

      if (err) {
        setError(err)

        return
      }

      setToggleDelete(false)
      fetchData()
    },
    [deleteImageHomePage, fetchData]
  )

  const selectedItemToRemove = useCallback((id) => {
    setToggleDelete(true)
    setImageIdToRemove(id)
  }, [])

  if (errorCode) {
    return <Error statusCode={errorCode} />
  }

  return (
    <>
      <CenterItem
        className="md:hidden"
        content="Use a larger screen to access the backoffice"
      />

      <div className="hidden md:block">
        {error ? <FormError error={error} /> : ""}

        <Dialog
          isOpen={isOpen}
          dialogTitle={"Upload image"}
          content={"The image is upload"}
        />

        <ConfirmDelete
          isOpen={toggleDelete}
          page="image home page"
          close={() => setToggleDelete(false)}
          remove={() => handleDelete(imageIdToRemove)}
        />

        <Title title="Image home page" />

        <p className="italic text-lg my-8">
          You can only have a minimum of 3 images and a maximum of 4 images
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 w-screen m-2">
          <div className="flex flex-col">
            <div className="flex  items-center gap-4">
              <input
                type="file"
                onChange={handleFileInput}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="border-2 rounded-lg flex justify-center items-center bg-gray-200 cursor-pointer px-4 py-2 hover:bg-gray-300"
              >
                <FontAwesomeIcon icon={faPlus} className="text-2xl" />
                <span className="ml-2">Choose File</span>
              </label>

              <button
                className="border-2 rounded-lg flex justify-center items-center bg-gray-200 cursor-pointer px-4 py-2 hover:bg-gray-300"
                onClick={handleSubmit}
              >
                <FontAwesomeIcon icon={faUpload} className="text-2xl" />
                <span className="ml-2">Upload</span>
              </button>
            </div>

            <p>{urlImage}</p>
          </div>

          {image.map((obj, index) => (
            <div key={index} className="relative overflow-hidden w-72 h-48">
              <Image
                src={obj.urlImage}
                alt={"image"}
                className={`w-full h-full object-cover rounded-xl ${
                  !obj.display && "opacity-20"
                }`}
                width="500"
                height="500"
              />

              <span
                className={`absolute top-0 left-0 w-fit h-fit p-1 text-white text-sm rounded-r-lg ${
                  obj.display ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {obj.display ? "Visible " : "Not visible"}
              </span>

              <div
                className={`absolute inset-0 bg-black opacity-0 hover:opacity-80 transition-opacity ease-linear duration-300 flex items-center justify-center gap-4 rounded-lg ${
                  !obj.display && imagesDisplay === 4 && "cursor-not-allowed"
                } ${
                  obj.display && imagesDisplay === 3 && "cursor-not-allowed"
                }`}
              >
                <button
                  className="cursor-pointer"
                  onClick={() => selectedItemToRemove(obj.id)}
                >
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="text-white text-3xl"
                  />
                </button>

                <button
                  className="cursor-pointer"
                  onClick={() => handleChangeDisplay(obj.id)}
                >
                  {obj.display && imagesDisplay !== 3 && imagesDisplay > 3 && (
                    <FontAwesomeIcon
                      icon={faTimes}
                      className="text-red-500 text-4xl"
                    />
                  )}

                  {!obj.display && imagesDisplay !== 4 && imagesDisplay < 4 && (
                    <FontAwesomeIcon
                      icon={faPlus}
                      className="text-green-500 text-4xl"
                    />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

ImageHomePage.getLayout = function (page) {
  return (
    <AppContextProvider>
      <LayoutAdmin>{page}</LayoutAdmin>
    </AppContextProvider>
  )
}

export default ImageHomePage
