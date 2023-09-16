import React, { useContext, useEffect } from 'react'
import { UserContext } from '../Contexts/UserContext';
import { MessageContext } from '../Contexts/MessageContext';
import ChatWidget from '../Widgets/ChatWidget';

const ChatRoom = () => {
  const userContext = useContext(UserContext);
  const { user, socket, getAllUsers, allUsers, onlineUsers } = userContext;
  const messageContext = useContext(MessageContext);
  const { arrivalMessage, currentSelected, setCurrentSelected, typing, setTyping, messageFrom, setMessageFrom, message, setMessage } = messageContext;

  useEffect(()=>{
    getAllUsers()
    setCurrentSelected(null)
  },[]) // eslint-disable-line
  
  const handleMessage=(e)=>{
    setMessage(e.target.value)
    socket.current.emit("typing", {
      from: user._id,
      to: currentSelected._id,
      typing: true,
    });
  }

  const handleUserSelect=(user)=>{
    setCurrentSelected(user)
    const from=messageFrom.filter((id)=> id!== user._id)
    setMessageFrom(from)
  }

  return (
    <div>
      ChatRoom
      {allUsers.map((user)=>{
        return (
          <div key={user._id} onClick={()=>handleUserSelect(user)}>
            {user.email}
            {onlineUsers.includes(user._id) && <div>Online</div>}
            {messageFrom.includes(user._id) && messageFrom.filter((id) => id === user._id).length}
            </div>
        )
      })}
      <button onClick={()=>console.log(currentSelected)}>CurrentUser</button>
      <button onClick={()=>console.log(arrivalMessage)}>arrival</button>
      {currentSelected && (
        <ChatWidget selectedUser={currentSelected} message={message} setMessage={setMessage} typing={typing} setTyping={setTyping} handleMessage={handleMessage} />
      )}
    </div>
  )
}

export default ChatRoom
