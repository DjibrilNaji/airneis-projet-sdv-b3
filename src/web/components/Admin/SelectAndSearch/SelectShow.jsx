import useAppContext from "@/web/hooks/useAppContext"

const SelectShow = (props) => {
  const { name } = props

  const {
    state: { limit },
    actions: { handleLimitChange },
  } = useAppContext()

  return (
    <div className="flex gap-2 my-6">
      <span>Show</span>
      <select
        name="country"
        className="border-2 rounded-lg px-3 text-right focus:outline-none"
        value={limit}
        onChange={handleLimitChange}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
        <option value="25">25</option>
        <option value="30">30</option>
      </select>
      <span>{name} per page</span>
    </div>
  )
}

export default SelectShow
