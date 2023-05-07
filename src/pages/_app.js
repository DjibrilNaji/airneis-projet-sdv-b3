import "@/styles.css"
import Head from "next/head"
import React from "react"
import Layout from "@/web/components/Layout/Layout"
import { AppContextProvider } from "@/web/hooks/useAppContext"
import { CartContextProvider } from "@/web/hooks/cartContext"
import { appWithTranslation } from "next-i18next"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"

function App({ Component, pageProps }) {
  const { locale } = useRouter()
  const { t } = useTranslation()
  const direction = t("direction", { locale })

  const renderWithLayout =
    Component.getLayout ||
    function (page) {
      return (
        <>
          <Head>
            <title>Airneis</title>
          </Head>
          <div dir={direction}>
            <CartContextProvider>
              <AppContextProvider isPublicPage={Component.isPublic}>
                <Layout>{page}</Layout>
              </AppContextProvider>
            </CartContextProvider>
          </div>
        </>
      )
    }

  return renderWithLayout(
    <>
      <Head>
        <title>Airneis</title>
      </Head>
      <div dir={direction}>
        <Component {...pageProps} />
      </div>
    </>
  )
}

export default appWithTranslation(App)
