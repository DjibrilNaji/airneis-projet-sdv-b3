import Head from "next/head"
import Navbar from "../components/Navbar"
import Link from "next/link"
import InputAuth from "../components/InputAuth"

const Login = () => {
    return (
        <>
            <Head>
                <title>Page de connexion</title>
            </Head>
            <Navbar/>

            <section className="flex justify-center pt-28">
                <div className="md:w-8/12 xl:w-6/12">
                    <form className="border-2 rounded-2xl p-10">
                        <h1 className="font-semibold opacity-70 text-2xl font-normal text-center pb-5 uppercase z-0">Connexion</h1>
                        <InputAuth type="text" placeholder="E-mail*"/>
                        <InputAuth type="password" placeholder="Mot de passe*"/>

                        <div className="text-center">
                            <p className="text-stone-400 text-sm font-semibold pb-4 ">
                                Vous n'êtes pas encore inscrit ?
                                <Link href="/" className="text-black"> S'inscrire</Link>
                            </p>

                            <button className="px-10 py-3 bg-stone-400 text-white text-sm uppercase rounded-full">
                                Se connecter
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}

export default Login
