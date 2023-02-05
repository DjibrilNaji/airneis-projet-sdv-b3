import NavAdmin from "./NavAdmin"

const LayoutAdmin = ({ children }) => {
  return (
    <>
      <div className="flex">
        <NavAdmin />
        <div className="m-5 mt-6">{children}</div>
      </div>
    </>
  )
}

export default LayoutAdmin
