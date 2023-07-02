import Pagination from "@/web/components/Admin/Pagination"
import SelectAndSearch from "@/web/components/Admin/SelectAndSearch/SelectAndSearch"
import Table from "@/web/components/Admin/Table/Table"
import Title from "@/web/components/Admin/Title"

const ContentPage = (props) => {
  const {
    title,
    totalPages,
    name,
    searchTerm,
    onChange,
    data,
    columnsTableBody,
    columnsTableHead,
    fetchSingleItem,
    getInfo,
    displayHighlander,
    displayIsDelete,
    displayDeleteButton,
    displayStatus,
    select,
  } = props

  return (
    <>
      <Title title={title} />

      <SelectAndSearch
        name={name}
        searchTerm={searchTerm}
        onChange={onChange}
      />

      {data?.length > 0 && (
        <>
          <Pagination totalPages={totalPages} />

          <Table
            data={data}
            columnsTableBody={columnsTableBody}
            columnsTableHead={columnsTableHead}
            fetchSingleItem={fetchSingleItem}
            getInfo={getInfo}
            select={select}
            displayHighlander={displayHighlander}
            displayIsDelete={displayIsDelete}
            displayDeleteButton={displayDeleteButton}
            displayStatus={displayStatus}
          />
        </>
      )}

      <div
        className={`${
          data?.length > 0
            ? "hidden"
            : typeof data === "undefined"
            ? "hidden"
            : "flex"
        } items-center justify-center mb-5`}
      >
        <span className="font-bold text-3xl text-black ">
          There are no data
        </span>
      </div>
    </>
  )
}

export default ContentPage
