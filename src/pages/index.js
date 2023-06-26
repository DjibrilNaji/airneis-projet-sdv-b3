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

  const { t } = useTranslation("home-page")

  const { locale } = useRouter()
  const direction = t("direction", { locale })

  return (
    <>
      {error ? <FormError error={error} /> : ""}

      <Carousel image={result.imageHomePage} />

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
