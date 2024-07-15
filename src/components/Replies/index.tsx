'use client'

import styles from './replies.module.css'
import { useEffect, useState } from 'react'
import Comment, { commentWithAuthor } from '@/components/Comment'
import ModalReply from '@/components/ModalReply'
import Spinner from '@/components/Spinner'

export interface commentWithChildren extends commentWithAuthor {
  children?: commentWithAuthor[]
}

interface RepliesProps {
  comment: commentWithAuthor
}

const Replies = ({ comment }: RepliesProps) => {
  const [showReplies, setShowReplies] = useState(false)
  const [replies, setReplies] = useState<commentWithAuthor[]>([])
  const [loading, setLoading] = useState(false)

  const fetchReply = async () => {
    setLoading(true)
    const response = await fetch(`/api/comment/${comment.id}/replies`)
    const data = await response.json()
    setReplies(data)
    setLoading(false)
  }

  useEffect(() => {
    if (showReplies) {
      fetchReply()
    }
  }, [showReplies])

  const toggleShowReplies = () => {
    setShowReplies(!showReplies)
  }

  return (
    <div className="pt-2">
      <button
        onClick={toggleShowReplies}
        className={styles.btn}>
        {showReplies ? 'Ocultar' : 'Ver'} respostas
      </button>
      {showReplies && (
        <div className="pt-4 ml-10">
          {loading ? (
            <Spinner />
          ) : replies.length ? (
            <ul className="flex flex-col gap-y-6">
              {replies.map((reply: commentWithAuthor) => (
                <li key={reply.id}>
                  <Comment comment={reply} />
                  <ModalReply comment={reply} />
                </li>
              ))}
            </ul>
          ) : (
            <p>Nenhuma resposta</p>
          )}
        </div>
      )}
    </div>
  )
}

export default Replies
