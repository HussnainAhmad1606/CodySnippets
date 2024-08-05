"use client"
import React, { useEffect, useState } from 'react';
import { receiveUserChats } from '@/utils/utils'; // Adjust the import path accordingly
import { useUserStore } from '@/store/store';
import ChatCard from '@/components/ChatCard';

const ChatList = () => {
  const [chats, setChats] = useState([]);

  const {UserId} = useUserStore();

  useEffect(() => {
    receiveUserChats(UserId, (chats) => {
        console.log(chats)
      if (chats) {
        setChats(chats);
      } else {
        setChats([]);
      }
    });
  }, [UserId]);
  return (

<div className="drawer lg:drawer-open">
<input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
<div className="drawer-content flex flex-col items-center justify-center">
  {/* Page content here */}
  <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
    Open drawer
  </label>
</div>
<div className="drawer-side">
  <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
  <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4" style={{
    width: "350px"
  }}>
    {/* Sidebar content here */}
    {
      chats.length == 0?<center><h1 className="my-5 text-2xl">No Chats Found</h1></center>:null
    }
   
    {chats.map((chat, index) => {
        console.log(chat)
        return (

            <li>
        
        <ChatCard key={chat.chatId} lastMessage={chat.lastMessage} chatId={chat.chatId}/>
</li>
        )
})}

  </ul>
</div>
</div>  );
};

export default ChatList;

