import React, { useContext, useEffect } from 'react'
import { UserContext } from '../Contexts/UserContext';

const Homepage = () => {
  const context = useContext(UserContext);
  const { token, socket, user } = context;
  

  useEffect(()=>{
    if(socket.current){
      socket.current.emit("add-user", user._id);
    }
  },[])
  return (
    <div>
      HomePage
    </div>
  )
}

export default Homepage
