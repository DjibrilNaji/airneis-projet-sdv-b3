import Link from "@/web/components/Link"

const RequiredSignInPage = () => {
  return (
    <>
      <div className="py-64">
        <p className="flex justify-center items-center md:w-auto">
          Cette page est accessible seulement aux utilisateurs.
        </p>
        <p className="flex justify-center items-center md:w-auto">
          Veuillez vous connectez avec le lien ci-dessous ou vous redirigez vers
          la page de connexion.
        </p>
        <div className="flex justify-center py-7 md:justify-center items-center">
          <Link href="/login" className="text-stone-400">
            Se connecter
          </Link>
        </div>
      </div>
    </>
  )
}

export default RequiredSignInPage
