import NavAdmin from "./NavAdmin"

const LayoutAdmin = ({ children }) => {
  return (
    <>
      <div className="flex">
        <NavAdmin />
        <div className="mt-10">{children}</div>
      </div>
    </>
  )
}

export default LayoutAdmin
