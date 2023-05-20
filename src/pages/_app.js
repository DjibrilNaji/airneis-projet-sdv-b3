import "@/styles.css"
import Head from "next/head"
import React from "react"
import Layout from "@/web/components/Layout/Layout"
import { AppContextProvider } from "@/web/hooks/useAppContext"
import { CartContextProvider } from "@/web/hooks/cartContext"
import { appWithTranslation } from "next-i18next"

function App({ Component, pageProps }) {
  const renderWithLayout =
    Component.getLayout ||
    function (page) {
      return (
        <>
          <Head>
            <title>Airneis</title>
          </Head>
          <CartContextProvider>
            <AppContextProvider isPublicPage={Component.isPublic}>
              <Layout>{page}</Layout>
            </AppContextProvider>
          </CartContextProvider>
        </>
      )
    }

  return renderWithLayout(
    <>
      <Head>
        <title>Airneis</title>
      </Head>

      <AppContextProvider>
        <Component {...pageProps} />
      </AppContextProvider>
    </>
  )
}

export default appWithTranslation(App)
