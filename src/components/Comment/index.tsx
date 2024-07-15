import { Comment as prismaComment, User } from '@prisma/client'
import Image from 'next/image'

export interface commentWithAuthor extends prismaComment {
  author?: User
}

interface commentProps {
  comment: commentWithAuthor
}

const Comment = ({ comment }: commentProps) => {
  return (
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
  )
}

export default Comment
