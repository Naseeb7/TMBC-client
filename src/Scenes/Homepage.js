import React, { useContext, useEffect } from 'react'
import { UserContext } from '../Contexts/UserContext';

const Homepage = () => {
  const context = useContext(UserContext);
  const { token, socket, user, setOnlineUsers } = context;
  
  useEffect(()=>{
    if(socket.current && (token !== undefined)){
      socket.current.emit("add-user", user._id);
    }
  },[]) // eslint-disable-line

  useEffect(()=>{
    if(socket.current){
      socket.current.on("online-users",(data)=>{
        // const exceptMe=data.filter((id)=> id !== user._id)
        setOnlineUsers(data)
      });
    }
  },[]) // eslint-disable-line

  return (
    <div>
      HomePage
    </div>
  )
}

export default Homepage
