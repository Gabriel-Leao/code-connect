import { Comment as prismaComment, User } from '@prisma/client'
import Image from 'next/image'
import ModalReply from '@/components/ModalReply'
import { postReply } from '@/actions'
import Replies from '@/components/Replies'

export interface commentWithAuthor extends prismaComment {
  author?: User
}

interface commentProps {
  comment: commentWithAuthor
}

const Comment = ({ comment }: commentProps) => {
  const submitReply = postReply.bind(null, comment)
  return (
    <div className="border-b-[#3E3E3F] border-b-[1px] pb-4">
      <div className="flex gap-x-1 items-center pb-2">
        <Image
          src={comment.author!.avatar}
          alt={`avatar do ${comment.author?.username}`}
          width={32}
          height={32}
        />
        <strong>@{comment.author?.username}</strong>
        <p>{comment.text}</p>
      </div>
      <ModalReply
        action={submitReply}
        parent={comment}
      />
      <Replies />
    </div>
  )
}

export default Comment
