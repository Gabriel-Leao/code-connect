'use client'

import { useRef } from 'react'
import Modal, { ModalHandles } from '@/components/Modal'
import ModalButton from '@/components/ModalButton'
import IconButton from '@/components/IconButton'
import { commentWithAuthor } from '@/components/Comment'
import Image from 'next/image'
import { postReply } from '@/actions'

const ModalReply = ({ comment }: { comment: commentWithAuthor }) => {
  const modalRef = useRef<ModalHandles>(null)
  const submitReply = postReply.bind(null, comment)

  const handleAction = async (formData: FormData) => {
    await submitReply(formData)
    modalRef.current?.closeModal()
  }

  return (
    <>
      <Modal ref={modalRef}>
        <div className="flex gap-x-2 items-center">
          <Image
            src={comment.author!.avatar}
            alt={`avatar do ${comment.author?.username}`}
            width={32}
            height={32}
          />
          <p className="text-[#81FE88]">@{comment.author?.username}</p>
          <p className="text-[#E1E1E1]">{comment.text}</p>
        </div>
        <div className="my-4 h-[88px] border-l-[1px] border-l-[#888]" />
        <form action={handleAction}>
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
