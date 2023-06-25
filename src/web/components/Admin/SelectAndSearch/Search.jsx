const Search = (props) => {
  const { searchTerm, onChange } = props

  return (
    <div className="mx-1">
      <input
        type="text"
        placeholder="Search"
        className="border-2 border-stone-500 rounded-lg px-2 focus:outline-none"
        value={searchTerm == null ? "" : searchTerm}
        onChange={onChange}
      />
    </div>
  )
}

export default Search
