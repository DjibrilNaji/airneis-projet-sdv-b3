import ButtonPagination from "@/web/components/Admin/Button/ButtonPagination"
import useAppContext from "@/web/hooks/useAppContext"
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline"
import { useCallback } from "react"

const Pagination = ({ totalPages }) => {
  const {
    state: { currentPage },
    actions: { handlePageChange },
  } = useAppContext()

  const selectPage = useCallback(
    (e) => {
      const newSelectedPage = parseInt(e.target.value)
      handlePageChange(newSelectedPage)
    },
    [handlePageChange]
  )

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

        <div className="flex gap-2">
          <select
            name="pages"
            className="border-2 rounded-lg px-2 focus:outline-none"
            value={currentPage}
            onChange={selectPage}
          >
            {Array.from({ length: totalPages }).map((_, index) => (
              <option value={index + 1} key={index}>
                {index + 1}
              </option>
            ))}
          </select>
          <p> / of {totalPages} pages</p>
        </div>

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
