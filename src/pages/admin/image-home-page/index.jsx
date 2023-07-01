import LayoutAdmin from "@/web/components/Admin/LayoutAdmin/LayoutAdmin"
import Title from "@/web/components/Admin/Title"
import CenterItem from "@/web/components/CenterItem"
import FormError from "@/web/components/FormError"
import useAppContext, { AppContextProvider } from "@/web/hooks/useAppContext"
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import { useCallback, useEffect, useState } from "react"

const ImageHomePage = () => {
  const [image, setImage] = useState([])

  const [error, setError] = useState("")

  const {
    actions: { getImagesHomePage, changeDisplayImageHomePage },
  } = useAppContext()

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

  return (
    <>
      <CenterItem
        className="md:hidden"
        content="Use a larger screen to access the backoffice"
      />

      <div className="hidden md:block">
        {error ? <FormError error={error} /> : ""}
        <Title title="Image home page" />

        <p className="italic text-lg my-8">
          You can only have a minimum of 3 images and a maximum of 4 images
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 w-screen m-2">
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
                  onClick={() => handleChangeDisplay(obj.id)}
                >
                  {obj.display && imagesDisplay != 3 && imagesDisplay > 3 && (
                    <FontAwesomeIcon
                      icon={faTimes}
                      className="text-red-500 text-4xl"
                    />
                  )}

                  {!obj.display && imagesDisplay != 4 && imagesDisplay < 4 && (
                    <FontAwesomeIcon
                      icon={faPlus}
                      className="text-green-500 text-4xl"
                    />
                  )}
                </button>
              </div>
            </div>
          ))}

          <button className="w-72 h-48 border-2 rounded-lg flex justify-center items-center bg-gray-200 cursor-pointer">
            <FontAwesomeIcon icon={faPlus} className="text-2xl" />
          </button>
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
