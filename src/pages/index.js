import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useRouter } from "next/router"
import FormError from "@/web/components/Form/FormError"
import Categories from "@/web/components/Cards/Categories"
import Products from "@/web/components/Cards/Products"
import Banner from "@/web/components/Design/Banner"
import Carousel from "@/web/components/Design/Carousel"
import { useEffect, useState } from "react"
import useAppContext from "@/web/hooks/useAppContext"

export const getServerSideProps = async (context) => {
  const { locale } = context

  return {
    props: {
      ...(await serverSideTranslations(locale, ["home-page", "navigation"])),
    },
  }
}

const Home = () => {
  const {
    actions: { categoriesAndProducts },
  } = useAppContext()

  const [data, setData] = useState([])
  const [err, setError] = useState()

  useEffect(() => {
    const fetchProducts = async () => {
      const [err, data] = await categoriesAndProducts()

      if (err) {
        setError(err)

        return
      }

      setData(data.result)
    }
    fetchProducts()
  }, [categoriesAndProducts])

  const { t } = useTranslation("home-page")

  const { locale } = useRouter()
  const direction = t("direction", { locale })

  return (
    <>
      {err ? <FormError error={err} /> : ""}

      <Carousel image={data.imageHomePage} />

      <div className="flex justify-center my-4">
        <p
          className="p-6 text-center font-bold text-stone-400 text-xl"
          dir={direction}
        >
          {t("home_description_first")} <br />
          {t("home_description_second")}
        </p>
      </div>

      <Categories data={data.categories} />
      <Banner text={t("highlander")} />
      <Products data={data.products} />
    </>
  )
}

Home.isPublic = true

export default Home
