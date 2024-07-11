import Comment, { commentWithAuthor } from '@/components/Comment'

interface commentListProps {
  comments: commentWithAuthor[]
}

const CommentList = ({ comments }: commentListProps) => {
  return (
    <ul>
      {comments.map((comment: commentWithAuthor) => (
        <li key={comment.id}>
          <Comment comment={comment} />
        </li>
      ))}
    </ul>
  )
}

export default CommentList
