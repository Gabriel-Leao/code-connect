'use client'

import { useRef } from 'react'
import Modal, { ModalHandles } from '@/components/Modal'
import ModalButton from '@/components/ModalButton'
import IconButton from '@/components/IconButton'
import { commentWithAuthor } from '@/components/Comment'
import Image from 'next/image'

const ModalReply = ({
  action,
  parent
}: {
  action: (formData: FormData) => Promise<void>
  parent: commentWithAuthor
}) => {
  const modalRef = useRef<ModalHandles>(null)

  return (
    <>
      <Modal ref={modalRef}>
        <div className="flex gap-x-2 items-center">
          <Image
            src={parent.author!.avatar}
            alt={`avatar do ${parent.author?.username}`}
            width={32}
            height={32}
          />
          <p className="text-[#81FE88]">@{parent.author?.username}</p>
          <p className="text-[#E1E1E1]">{parent.text}</p>
        </div>
        <Image
          src="/line.svg"
          alt="linha separadora"
          className="py-4"
          height={88}
          width={1}
        />
        <form action={action}>
          <textarea
            name="text"
            className="bg-[#BCBCBC] w-full h-[160px] mb-6 rounded-lg p-4 focus:outline-none text-[#132E35]"></textarea>
          <ModalButton>Responder</ModalButton>
        </form>
      </Modal>

      <IconButton
        onClick={() => modalRef.current?.openModal()}
        className="text-lg text-[#3E3E3F]">
        <strong>Responder</strong>
      </IconButton>
    </>
  )
}

export default ModalReply
