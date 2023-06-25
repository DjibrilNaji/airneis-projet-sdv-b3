import Search from "@/web/components/Admin/SelectAndSearch/Search"
import SelectShow from "@/web/components/Admin/SelectAndSearch/SelectShow"

const SelectAndSearch = (props) => {
  const { limit, handleLimitChange, name, searchTerm, onChange } = props

  return (
    <div className="flex items-center justify-between">
      <SelectShow
        limit={limit}
        handleLimitChange={handleLimitChange}
        name={name}
      />
      <Search searchTerm={searchTerm} onChange={onChange} />
    </div>
  )
}

export default SelectAndSearch
