import Navbar from "@/web/components/Layout/Navbar"
import Footer from "@/web/components/Layout/Footer"

const Layout = (props) => {
  const { children } = props

  return (
    <div className="flex flex-col md:min-h-screen">
      <Navbar />
      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
  )
}

export default Layout
