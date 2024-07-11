import React, {
  forwardRef,
  ReactNode,
  RefObject,
  useImperativeHandle,
  useRef
} from 'react'

interface ModalProps {
  children: ReactNode
}

export interface ModalHandles {
  closeModal: () => void
  openModal: () => void
}

const Modal = forwardRef<ModalHandles, ModalProps>(({ children }, ref) => {
  const dialogRef: RefObject<HTMLDialogElement> =
    useRef<HTMLDialogElement>(null)

  const closeModal = () => {
    dialogRef.current?.close()
  }

  const openModal = () => {
    dialogRef.current?.showModal()
  }

  useImperativeHandle(ref, () => ({
    closeModal,
    openModal
  }))

  return (
    <dialog
      ref={dialogRef}
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#3E3E3F] p-6 w-[960px] max-w-[80%] border-none rounded-[32px]">
      <header className="flex justify-end">
        <button
          className="bg-transparent text-[#e1e1e1] cursor-pointer border-none text-lg"
          onClick={closeModal}>
          X
        </button>
      </header>
      {children}
    </dialog>
  )
})

Modal.displayName = 'Modal'

export default Modal
