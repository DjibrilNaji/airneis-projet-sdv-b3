import useAppContext from "@/web/hooks/useAppContext"

const ButtonPagination = ({ icon, changePage, disabledPage }) => {
  const {
    state: { currentPage },
    actions: { handlePageChange },
  } = useAppContext()

  return (
    <button
      className="w-6 disabled:opacity-30 disabled:cursor-not-allowed"
      disabled={currentPage === disabledPage}
      onClick={() => handlePageChange(changePage)}
    >
      {icon}
    </button>
  )
}

export default ButtonPagination
