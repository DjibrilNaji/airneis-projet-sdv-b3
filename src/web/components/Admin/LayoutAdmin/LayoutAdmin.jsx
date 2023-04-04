import NavAdmin from "./NavAdmin"

const LayoutAdmin = ({ children }) => {
  return (
    <>
      <div className="flex">
        <NavAdmin />
      </div>
      <div className="min-w-max">{children}</div>
    </>
  )
}

export default LayoutAdmin
