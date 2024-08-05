import React from 'react'

function CurrentUserChatCard({username}) {
  return (
    <div className="p-10 my-5 flex justify-between items-center  flex-row card bg-base-100 w-full h-[20vh] shadow-xl">
     <div className="avatar">
  <div className="ring-primary ring-offset-base-100 w-16 rounded-full ring ring-offset-2">
    <img src={`https://ui-avatars.com/api/?name=${username}`} />
  </div>
</div>
 
    <h2 className="card-title">{username}</h2>
  
</div>
  )
}

export default CurrentUserChatCard