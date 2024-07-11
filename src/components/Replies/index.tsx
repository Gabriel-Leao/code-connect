'use client'

import { useState } from 'react'

const Replies = () => {
  const [showReplies, setShowReplies] = useState(false)

  const toggleShowReplies = () => {
    setShowReplies(!showReplies)
  }
  return (
    <div className="pt-2">
      <button onClick={toggleShowReplies}>
        {showReplies ? 'Ocultar' : 'Ver'} respostas
      </button>
    </div>
  )
}

export default Replies
