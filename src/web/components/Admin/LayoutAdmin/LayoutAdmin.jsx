import NavAdmin from "./NavAdmin"

const LayoutAdmin = ({ children }) => {
  return (
    <>
      <div className="flex">
        <NavAdmin />
        <div>{children}</div>
      </div>
    </>
  )
}

export default LayoutAdmin
