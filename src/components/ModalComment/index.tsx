'use client'

import { useRef } from 'react'
import Modal, { ModalHandles } from '@/components/Modal'
import IconButton from '@/components/IconButton'
import Image from 'next/image'
import ModalButton from '@/components/ModalButton'

const ModalComment = ({
  action
}: {
  action: (formData: FormData) => Promise<void>
}) => {
  const modalRef = useRef<ModalHandles>(null)

  const handleAction = async (formData: FormData) => {
    await action(formData)
    modalRef.current?.closeModal()
  }

  return (
    <>
      <Modal ref={modalRef}>
        <h3 className="text-[#80FE87] text-3xl mb-4">
          Deixe seu comentário sobre o post:
        </h3>
        <form action={handleAction}>
          <textarea
            name="text"
            className="bg-[#BCBCBC] w-full h-[160px] mb-6 rounded-lg p-4 focus:outline-none text-[#132E35]"></textarea>
          <ModalButton>Comentar</ModalButton>
        </form>
      </Modal>

      <IconButton onClick={() => modalRef.current?.openModal()}>
        <Image
          src="/comments.svg"
          alt="Icone de comentario"
          width={26}
          height={26}
        />
      </IconButton>
    </>
  )
}

export default ModalComment
