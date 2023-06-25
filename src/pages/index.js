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
import Carousel from "@/web/components/Carousel"

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
      {error ? <FormError error={error} /> : ""}

      <Carousel
        image={result.imageHomePage}
        activeIndex={activeIndex}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        setActiveIndex={setActiveIndex}
      />

      <div className="flex justify-center my-4">
        <p
          className="p-6 text-center font-bold text-stone-400 text-xl"
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
