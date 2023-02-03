import RegisterForm from "@/components/Auth/RegisterForm"

const Register = () => {
  return (
    <>
      <div className="w-80 mx-auto">
        <h1 className="font-semibold text-2xl text-center uppercase">
          Inscription
        </h1>

        <RegisterForm />
      </div>
    </>
  )
}

export default Register
