import "@/styles.css"
import ContextProvider from "@/components/ContextProvider"
import Head from "next/head"
import React from "react"
import Layout from "@/components/Layout/Layout"

export default function App({Component, pageProps}) {
    return (
        <>
            <Head>
                <title>Airneis</title>
            </Head>

            <Layout>
                <ContextProvider>
                    <Component {...pageProps} />
                </ContextProvider>
            </Layout>
        </>
    )
}