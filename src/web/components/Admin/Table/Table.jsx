import CustomTableBody from "@/web/components/Admin/Table/CustomTableBody"
import CustomTableHead from "@/web/components/Admin/Table/CustomTableHead"

const Table = (props) => {
  const {
    data,
    columnsTableHead,
    columnsTableBody,
    selectItemToRemove,
    selectedItems,
    handleSortChange,
    handleSelectItem,
    fetchSingleItem,
    getInfo,
    displayIsDelete,
    displayDeleteButton,
    displayStatus,
  } = props

  return (
    <table className="w-[100vw]">
      <CustomTableHead
        columns={columnsTableHead}
        handleSortChange={handleSortChange}
      />

      <CustomTableBody
        data={data || []}
        columns={columnsTableBody}
        selectedItems={selectedItems}
        handleSelectItem={handleSelectItem}
        selectItemToRemove={selectItemToRemove}
        fetchSingleItem={fetchSingleItem}
        getInfo={getInfo}
        displayIsDelete={displayIsDelete}
        displayDeleteButton={displayDeleteButton}
        displayStatus={displayStatus}
      />
    </table>
  )
}

export default Table
