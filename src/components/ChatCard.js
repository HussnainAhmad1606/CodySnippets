import { useUserStore } from '@/store/store';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { format } from 'timeago.js';

function ChatCard({chatId, lastMessage}) {
    const router = useRouter();
    const [name, setName] = useState('');
    const {UserId, setCurrentChatUser} = useUserStore();
    const otherUserId = chatId.split('_').find(id => id !== UserId);
    console.log(chatId)
    console.log(otherUserId)

    const getUsername = async() => {
        const user = await axios.post('/api/users/get-user-username', {
            id: otherUserId
        })
        // console.log(user);
        setName(user.data.user.username);
        
    }

    useEffect(() => {
      getUsername();
    }, [chatId])
    
  return (
    <div onClick={()=>{
        router.push(`/chat/${chatId}`);
        setCurrentChatUser(name);

    }} className='my-3 flex items-center hover:bg-gray-500 hover:bg-opacity-10 transition duration-300 ease-in-out'>
        <div className="avatar">
  <div className="ring-primary ring-offset-base-100 rounded-full ring ring-offset-2">
    <img src={`https://ui-avatars.com/api/?name=${name}`}  />
  </div>
</div>
<div>
<div className='w-full flex justify-between'>
<h2 className='ml-5 text-1xl font-bold '>{name}</h2>
<p className='ml-2'>{format(new Date(lastMessage.timestamp))}</p>
</div>

<div className='ml-5 my-3'>
    <p>{lastMessage.text}</p>
</div>
</div>
    </div>
  )
}

export default ChatCard