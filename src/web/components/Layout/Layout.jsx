import Navbar from "@/web/components/Layout/Navbar"
import Footer from "@/web/components/Layout/Footer"

const Layout = (props) => {
  const { children } = props

  return (
    <div className="flex flex-col md:min-h-screen justify-between">
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}

export default Layout
