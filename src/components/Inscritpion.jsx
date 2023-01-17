import Head from "next/head"

const Inscription = () => {
    return (
        <>
            <Head>
                <title>Page d'inscription</title>
            </Head>

            <section className="h-screen">
                <div className="h-full">
                    <div
                        className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6"
                    >
                        <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
                            <form className="border-2 p-10 rounded-2xl">
                                <div
                                    className="font-semibold opacity-70 text-2xl font-normal text-center pb-5 uppercase">Inscription
                                </div>

                                <div className="mb-6">
                                    <input
                                        type="text"
                                        className="form-control block w-full px-4 py-2 text-lg font-normal text-gray-700 bg-white border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-stone-500 focus:outline-none"
                                        placeholder="Nom complet*"
                                    />
                                </div>

                                <div className="mb-6">
                                    <input
                                        type="email"
                                        className="form-control block w-full px-4 py-2 text-lg font-normal text-gray-700 bg-white border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-stone-500 focus:outline-none"
                                        placeholder="E-mail*"
                                    />
                                </div>

                                <div className="mb-6">
                                    <input
                                        type="password"
                                        className="form-control block w-full px-4 py-2 text-lg font-normal text-gray-700 bg-white border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-stone-500 focus:outline-none"
                                        placeholder="Mot de passe*"
                                    />
                                </div>

                                <div className="text-center">
                                    <p className="text-stone-400 text-sm font-semibold mt-2 pt-1 pb-4 mb-0">
                                        Déjà un compte ?
                                        <a
                                            href="#"
                                            className="text-black"
                                        > Connectez vous
                                        </a>
                                    </p>

                                    <button
                                        type="button"
                                        className="px-10 py-3 bg-stone-400 text-white text-sm uppercase rounded-full"

                                    >
                                        S'inscrire
                                    </button>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>


        </>
    )
}

export default Inscription

