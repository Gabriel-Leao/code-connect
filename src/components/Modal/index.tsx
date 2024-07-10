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

const Modal = forwardRef(({ children }: ModalProps, ref) => {
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
      className="modal">
      <header>
        <button>X</button>
      </header>
      {children}
    </dialog>
  )
})

Modal.displayName = 'Modal'

export default Modal
