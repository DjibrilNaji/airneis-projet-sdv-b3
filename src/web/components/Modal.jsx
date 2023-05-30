import Button from "@/web/components/Button"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Modal = (props) => {
  const { isOpen, modalTitle, closeModal, children, dir } = props


  return (
    <>
      <div
        className={`fixed z-50 inset-0 overflow-y-auto transform transition-all  ${
          isOpen ? "" : "hidden"
        }`}
      >
        <div className="flex items-center justify-center min-h-screen">
          <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
          <div className="bg-white rounded-lg z-20 p-6 max-h-[90vh] overflow-y-auto w-fit">
            <div className="flex mb-4 justify-between items-center" dir={dir}>
              <h3 className="font-bold text-2xl">{modalTitle}</h3>
              <Button onClick={closeModal} size="sm" className="rounded-lg">
                <FontAwesomeIcon icon={faXmark} />
              </Button>
            </div>
            <div className="mb-4">{children}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal
