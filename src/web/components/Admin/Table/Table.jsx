import CustomTableBody from "@/web/components/Admin/Table/CustomTableBody"
import CustomTableHead from "@/web/components/Admin/Table/CustomTableHead"

const Table = (props) => {
  const {
    data,
    columnsTableHead,
    columnsTableBody,
    fetchSingleItem,
    getInfo,
    displayHighlander,
    displayIsDelete,
    displayDeleteButton,
    displayStatus,
  } = props

  return (
    <table className="w-[100vw]">
      <CustomTableHead columns={columnsTableHead} />

      <CustomTableBody
        data={data || []}
        columns={columnsTableBody}
        fetchSingleItem={fetchSingleItem}
        getInfo={getInfo}
        displayHighlander={displayHighlander}
        displayIsDelete={displayIsDelete}
        displayDeleteButton={displayDeleteButton}
        displayStatus={displayStatus}
      />
    </table>
  )
}

export default Table
