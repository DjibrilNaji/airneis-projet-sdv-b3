import Button from "@/web/components/Button"

const Dialog = (props) => {
  const { isOpen, modalTitle, content, closeModal, buttonCloseTitle } = props

  return (
    <>
      <div
        className={`fixed z-50 inset-0 overflow-y-auto transform hover:scale-110 transition-all  ${
          isOpen ? "" : "hidden"
        }`}
      >
        <div className="flex items-center justify-center min-h-screen">
          <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
          <div className="bg-white rounded-lg z-20 p-6">
            <div className="mb-4">
              <h3 className="font-bold text-2xl">{modalTitle}</h3>
            </div>
            <div className="mb-4">{content}</div>
            <div className="flex justify-end">
              <Button onClick={closeModal} size="sm" className="rounded-lg">
                {buttonCloseTitle}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dialog
