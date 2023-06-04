import ButtonPagination from "@/web/components/Admin/ButtonPagination"
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline"

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  const pagination = []
  pagination.push(
    <button
      className={`w-12 text-xl ${
        currentPage === 1 && "underline font-semibold"
      }`}
      onClick={() => handlePageChange(1)}
    >
      1
    </button>
  )

  if (
    (currentPage === 1 && totalPages > 2) ||
    (currentPage === totalPages && totalPages > 2)
  ) {
    pagination.push(<span className={``}>........</span>)
  }

  if (currentPage > 1) {
    pagination.push(
      <button
        className={`w-12 text-xl underline font-semibold`}
        onClick={() => handlePageChange(currentPage)}
      >
        {currentPage}
      </button>
    )
  }

  if (currentPage < totalPages) {
    pagination.push(
      <button
        className={`w-12 text-xl`}
        onClick={() => handlePageChange(totalPages)}
      >
        {totalPages}
      </button>
    )
  }

  return (
    <div className="flex justify-center my-5">
      <div className="flex gap-6">
        <ButtonPagination
          icon={<ChevronDoubleLeftIcon />}
          handlePageChange={handlePageChange}
          currentPage={currentPage}
          changePage={1}
          disabledPage={1}
        />

        <ButtonPagination
          icon={<ChevronLeftIcon />}
          handlePageChange={handlePageChange}
          currentPage={currentPage}
          changePage={currentPage - 1}
          disabledPage={1}
        />

        {pagination}

        <ButtonPagination
          icon={<ChevronRightIcon />}
          handlePageChange={handlePageChange}
          currentPage={currentPage}
          changePage={currentPage + 1}
          disabledPage={totalPages}
        />

        <ButtonPagination
          icon={<ChevronDoubleRightIcon />}
          handlePageChange={handlePageChange}
          currentPage={currentPage}
          changePage={totalPages}
          disabledPage={totalPages}
        />
      </div>
    </div>
  )
}

export default Pagination
