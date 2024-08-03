import React from 'react'
import { format } from 'timeago.js'
function CommentCard({body, username, createdAt}) {
  return (
    <div className="my-5 chat chat-start">
    <div className="chat-image avatar">
      <div className="w-10 rounded-full">
        <img
          alt="Author's Avatar"
          src={`https://ui-avatars.com/api/?name=${username}`} />
      </div>
    </div>
    <div className="my-2 chat-header">
     {username}
      <time className="text-xs opacity-50 mx-3">{format(createdAt)}</time>
    </div>
    <div className=" chat-bubble">{body}</div>
  </div>
  )
}

export default CommentCard