import LoginForm from "@/components/Auth/LoginForm"

const Login = () => {
  return (
    <>
      <div className="w-80 mx-auto">
        <div>
          <h1 className="font-semibold text-2xl text-center uppercase">
            Connexion
          </h1>

          <LoginForm />
        </div>
      </div>
    </>
  )
}

export default Login
