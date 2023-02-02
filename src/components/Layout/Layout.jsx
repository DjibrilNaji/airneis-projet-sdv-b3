import Navbar from "@/components/Layout/Navbar"
import Footer from "@/components/Layout/Footer"

const Layout = ({children}) => {
    return (
        <>
            <div className="flex flex-col md:min-h-screen justify-between">
                <Navbar/>
                {children}
                <Footer/>
            </div>

        </>
    )
}

export default Layout