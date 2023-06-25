const Form = ({ children, title }) => {
  return (
    <div className="fixed inset-0">
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center bg-white rounded-lg">
          <h1 className="flex text-2xl justify-center font-bold uppercase">
            {title}
          </h1>

          {children}
        </div>
      </div>
    </div>
  )
}

export default Form
