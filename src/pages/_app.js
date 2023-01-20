import "../styles.css"
import ContextProvider from "@/components/ContextProvider"

export default function App({ Component, pageProps }) {
  return (
    <ContextProvider>
      <Component {...pageProps} />
    </ContextProvider>
  )
}
