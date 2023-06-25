import Pagination from "@/web/components/Admin/Pagination"
import SelectAndSearch from "@/web/components/Admin/SelectAndSearch/SelectAndSearch"
import Table from "@/web/components/Admin/Table/Table"
import Title from "@/web/components/Admin/Title"

const ContentPage = (props) => {
  const {
    title,
    currentPage,
    totalPages,
    handlePageChange,
    limit,
    handleLimitChange,
    name,
    searchTerm,
    onChange,
    data,
    columnsTableBody,
    columnsTableHead,
    selectedItems,
    handleSortChange,
    handleSelectItem,
    selectItemToRemove,
    fetchSingleItem,
    getInfo,
    displayIsDelete,
    displayDeleteButton,
    displayStatus,
  } = props

  return (
    <>
      <Title title={title} />

      <SelectAndSearch
        limit={limit}
        handleLimitChange={handleLimitChange}
        name={name}
        searchTerm={searchTerm}
        onChange={onChange}
      />

      {data?.length > 0 && (
        <>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />

          <Table
            data={data}
            columnsTableBody={columnsTableBody}
            columnsTableHead={columnsTableHead}
            selectedItems={selectedItems}
            handleSortChange={handleSortChange}
            handleSelectItem={handleSelectItem}
            selectItemToRemove={selectItemToRemove}
            fetchSingleItem={fetchSingleItem}
            getInfo={getInfo}
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
