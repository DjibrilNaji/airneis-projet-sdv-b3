import Navbar from "../components/Navbar"
import Head from "next/head"
import Footer from "../components/Footer"
import Input from "../components/Input"

const contact = () => {
  return (
    <>
      <Navbar />
      <Head>
        <title>Contact</title>
      </Head>
      <div className="pt-44 pb-44">
        <div className="flex justify-center items-center">
          <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
            <form className="border-2 p-10 rounded-2xl">
              <h1 className="opacity-70 text-2xl font-normal text-center pb-5 uppercase z-0">
                Email Us
              </h1>

              <Input type="email" placeholder="E-mail*" />
              <Input type="text" placeholder="Subject" />
              <div className="mb-6">
                <textarea
                  className="form-control block w-full px-4 py-2 text-lg font-normal text-gray-700 bg-white border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-stone-500 focus:outline-none"
                  placeholder="Message*"
                />
              </div>

              <div className="text-center">
                <button
                  type="button"
                  className="px-10 py-3 bg-stone-400 text-white text-sm uppercase rounded-full"
                >
                  Envoyer
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default contact
