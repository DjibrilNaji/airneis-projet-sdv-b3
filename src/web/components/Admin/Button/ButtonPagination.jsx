const ButtonPagination = ({
  icon,
  handlePageChange,
  changePage,
  currentPage,
  disabledPage,
}) => {
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
