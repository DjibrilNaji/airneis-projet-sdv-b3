import Head from "next/head"
import Navbar from "@/components/Navbar"
import Link from "next/link"
import InputAuth from "@/components/InputAuth"

const Inscription = () => {
  return (
    <>
      <Head>
        <title>Page d'inscription</title>
      </Head>
      <Navbar />

      <section className="flex justify-center pt-28">
        <div className="md:w-8/12 xl:w-6/12">
          <form className="border-2 rounded-2xl p-10">
            <h1 className="opacity-70 text-2xl font-normal text-center pb-5 uppercase z-0">
              Inscription
            </h1>
            <InputAuth type="text" placeholder="Nom complet*" />
            <InputAuth type="email" placeholder="E-mail*" />
            <InputAuth type="password" placeholder="Mot de passe*" />

            <div className="text-center">
              <p className="text-stone-400 text-sm font-semibold pb-4 ">
                Déjà un compte ?
                <Link href="/" className="text-black">
                  {" "}
                  Connectez vous{" "}
                </Link>
              </p>

              <button className="px-10 py-3 bg-stone-400 text-white text-sm uppercase rounded-full">
                S'inscrire
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

export default Inscription
