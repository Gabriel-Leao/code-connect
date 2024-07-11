import Comment, { commentWithAuthor } from '@/components/Comment'

interface commentListProps {
  comments: commentWithAuthor[]
}

const CommentList = ({ comments }: commentListProps) => {
  return (
    <ul className="flex flex-col gap-y-4">
      {comments.map((comment: commentWithAuthor) => (
        <li key={comment.id}>
          <Comment comment={comment} />
        </li>
      ))}
    </ul>
  )
}

export default CommentList
