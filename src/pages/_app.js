import "@/styles.css"
import Head from "next/head"
import React from "react"
import Layout from "@/components/Layout/Layout"

export default function App({ Component, pageProps }) {
  const renderWithLayout =
    Component.getLayout ||
    function (page) {
      return (
        <>
          <Head>
            <title>Airneis</title>
          </Head>

          <Layout>{page}</Layout>
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
