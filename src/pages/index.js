import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useRouter } from "next/router"
import createAPIClient from "@/web/createAPIClient"
import categoriesAndProductsService from "@/web/services/categoriesAndProducts"
import FormError from "@/web/components/FormError"
import Categories from "@/web/components/Cards/Categories"
import Products from "@/web/components/Cards/Products"
import Banner from "@/web/components/Banner"

export const getServerSideProps = async (context) => {
  const { locale } = context

  const api = createAPIClient({ jwt: null, server: true })
  const categoriesAndProducts = categoriesAndProductsService({ api })

  const [err, data] = await categoriesAndProducts()

  return {
    props: {
      error: err,
      ...(await serverSideTranslations(locale, ["home-page", "navigation"])),
      categoriesAndProducts: data,
    },
  }
}

const Home = (props) => {
  const {
    categoriesAndProducts: { result },
    error,
  } = props

  const [activeIndex, setActiveIndex] = useState(0)

  const { t } = useTranslation("home-page")

  const handlePrevious = () => {
    setActiveIndex(
      (prevActiveIndex) =>
        (prevActiveIndex - 1 + result.imageHomePage.length) %
        result.imageHomePage.length
    )
  }

  const handleNext = () => {
    setActiveIndex(
      (prevActiveIndex) => (prevActiveIndex + 1) % result.imageHomePage.length
    )
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex(
        (prevActiveIndex) => (prevActiveIndex + 1) % result.imageHomePage.length
      )
    }, 8000)

    return () => {
      clearInterval(intervalId)
    }
  }, [result.imageHomePage.length])

  const { locale } = useRouter()
  const direction = t("direction", { locale })

  return (
    <>
      <div>
        {error ? <FormError error={error} /> : ""}
        <div className="relative">
          <div className="m-4 h-96 relative">
            {result.imageHomePage.map((image, index) => (
              <Image
                key={image.id}
                src={image.urlImage}
                alt="slide 2"
                className={`w-full h-full object-cover rounded-xl absolute ${
                  index === activeIndex ? "opacity-100" : "opacity-0"
                } transition-opacity ease-linear duration-300`}
                width="500"
                height="500"
              />
            ))}
          </div>
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="absolute top-[45%] fa-2xl border-2 bg-white p-2 left-0 rounded-full text-stone-500"
            onClick={handlePrevious}
          >
            <title>{t("arrow_left")}</title>
          </FontAwesomeIcon>

          <FontAwesomeIcon
            icon={faArrowRight}
            className="absolute top-[45%] fa-2xl border-2 bg-white p-2 right-0 rounded-full text-stone-500"
            onClick={handleNext}
          >
            <title>{t("arrow_right")}</title>
          </FontAwesomeIcon>
        </div>
        <div className="flex justify-center">
          {result.imageHomePage.map((image, index) => (
            <button
              onClick={() => setActiveIndex(index)}
              key={image.id}
              className={`rounded-full h-2 w-8 mt-2 mx-2 ${
                index === activeIndex
                  ? "bg-stone-500"
                  : "bg-stone-200 hover:bg-stone-900"
              }`}
              title={t("slides")}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-center my-4">
        <p
          className="p-6 text-center font-bold text-stone-500 text-xl"
          dir={direction}
        >
          {t("home_description_first")} <br />
          {t("home_description_second")}
        </p>
      </div>

      <Categories data={result.categories} />
      <Banner text={t("highlander")} />
      <Products data={result.products} />
    </>
  )
}

Home.isPublic = true

export default Home
