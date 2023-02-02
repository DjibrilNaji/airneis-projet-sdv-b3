import NavAdmin from "./NavAdmin"

const LayoutAdmin = ({ children }) => {
  return (
    <>
      <div className="">
        <NavAdmin />
        {children}
      </div>
    </>
  )
}

export default LayoutAdmin
