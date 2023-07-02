import Button from "@/web/components/Button/Button"
import Modal from "@/web/components/Modal"

const ConfirmDelete = (props) => {
  const { page, close, remove, isOpen } = props

  return (
    <Modal isOpen={isOpen} modalTitle={`Delete ${page}`} closeModal={close}>
      <div className="flex flex-col justify-end gap-5">
        <p className="text-xl">Are you sure you want to delete ?</p>
        <Button onClick={remove}>Confirm</Button>
      </div>
    </Modal>
  )
}

export default ConfirmDelete
