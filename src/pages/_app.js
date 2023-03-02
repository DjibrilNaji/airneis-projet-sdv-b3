import "@/styles.css"
import Head from "next/head"
import React from "react"
import Layout from "@/web/components/Layout/Layout"
import { AppContextProvider } from "@/web/hooks/useAppContext"

export default function App({ Component, pageProps }) {
  const renderWithLayout =
    Component.getLayout ||
    function (page) {
      return (
        <>
          <Head>
            <title>Airneis</title>
          </Head>
          <AppContextProvider isPublicPage={Component.isPublic}>
            <Layout>{page}</Layout>
          </AppContextProvider>
        </>
      )
    }

  return renderWithLayout(
    <>
      <Head>
        <title>Airneis</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}
