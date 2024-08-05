import { ref, push, set, onValue, off,  query, orderByChild, equalTo  } from 'firebase/database';
import { database } from '@/firebase/firebase';

export function sendMessage(chatId, sender, receiver, text) {
  const messageRef = ref(database, `chats/${chatId}/messages`);
  const newMessageRef = push(messageRef);
  set(newMessageRef, { // Correctly use the set function
    sender: sender,
    receiver: receiver,
    text: text,
    timestamp: Date.now()
  }).catch((error) => {
    console.error("Error sending message:", error); // Error handling
  });
}

export function receiveMessages(chatId, callback) {
  const messagesRef = ref(database, `chats/${chatId}/messages`);

  // Attach listener for messages
  const unsubscribe = onValue(messagesRef, (snapshot) => {
    const messages = snapshot.val();
    console.log("Received messages:", messages);
    callback(messages);
  }, (error) => {
    console.error("Error receiving messages:", error);
  });

  // Return a cleanup function to remove listener
  return () => {
    off(messagesRef); // Stop listening to updates
  };
}
export function receiveUserChats(userId, callback) {
  const chatsRef = ref(database, 'chats');
  onValue(chatsRef, (snapshot) => {
    const allChats = snapshot.val();
    const userChats = [];
    for (const chatId in allChats) {
      const messages = allChats[chatId].messages;
      let lastMessage = null;
      let involved = false;
      for (const messageId in messages) {
        const message = messages[messageId];
        if (message.sender === userId || message.receiver === userId) {
          involved = true;
          if (!lastMessage || message.timestamp > lastMessage.timestamp) {
            lastMessage = message;
          }
        }
      }
      if (involved) {
        userChats.push({ chatId, lastMessage });
      }
    }
    callback(userChats);
  });
}
export function generateChatId(userId1, userId2) {
  return userId1 < userId2 ? `${userId1}_${userId2}` : `${userId2}_${userId1}`;
}
