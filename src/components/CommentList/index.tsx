import Comment, { commentWithAuthor } from '@/components/Comment'
import ModalReply from '@/components/ModalReply'
import Replies from '@/components/Replies'

interface commentListProps {
  comments: commentWithAuthor[]
}

const CommentList = ({ comments }: commentListProps) => {
  return (
    <ul className="flex flex-col gap-y-4">
      {comments.map((comment: commentWithAuthor) => (
        <li
          key={comment.id}
          className="border-b-[#3E3E3F] border-b-[1px] pb-4">
          <Comment comment={comment} />
          <ModalReply comment={comment} />
          <Replies comment={comment} />
        </li>
      ))}
    </ul>
  )
}

export default CommentList
