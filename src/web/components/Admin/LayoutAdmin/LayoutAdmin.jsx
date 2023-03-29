import NavAdmin from "./NavAdmin"

const LayoutAdmin = ({ children }) => {
  return (
    <>
      <div className="flex">
        <NavAdmin />
      </div>
      <div className="m-1 mt-6">{children}</div>
    </>
  )
}

export default LayoutAdmin
