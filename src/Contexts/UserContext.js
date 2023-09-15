import { createContext, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

const BaseUrl=process.env.REACT_APP_BASE_URL

export const UserContext = createContext()

export const UserState = (props) => {
  const [user, setUser]=useState(null)
  const [onlineUsers, setOnlineUsers]=useState([])
  const [notifications, setNotifications] = useState([]);
  const socket=useRef()
  const navigate = useNavigate();

  useEffect(()=>{
    if(user){
      socket.current = io(BaseUrl, {
        reconnection: true,
        reconnectionDelay: 500,
        reconnectionAttempts: Infinity,
      });
    }
  },[user])

  useEffect(()=>{
    if(socket.current){
      socket.current.on("online-users",(data)=>{
        setOnlineUsers(data)
      });
    }
  },[])

  const registerUser =async (input) => {
    const response=await fetch(`${BaseUrl}/auth/register`,{
      method: "POST",
      headers : {'Content-Type' : 'application/json'},
      body : JSON.stringify(input),
    })
    const data=await response.json()
    console.log(data)
    if(response.status === 201){
      setNotifications((prev) => [
        ...prev,
        { reason: "Account created successfully! Please login.", id: uuidv4() },
      ]);
    }else{
      setNotifications((prev) => [
        ...prev,
        { reason: "User already exists! Please login", id: uuidv4() },
      ]);
    }
  };

  const login =async (input) => {
    const response=await fetch(`${BaseUrl}/auth/login`,{
      method: "POST",
      headers : {'Content-Type' : 'application/json'},
      body : JSON.stringify(input),
    })
    const data=await response.json()
    console.log(data)
    if(response.status===200){
    setUser(data.user)
    localStorage.setItem('token',data.token)
    navigate('/')
    setNotifications((prev) => [
      ...prev,
      { reason: "Logged in successfully!", id: uuidv4() },
    ]);
    }else{
      setNotifications((prev) => [
        ...prev,
        { reason: data.msg, id: uuidv4() },
      ]);
    }
  };

  const logOut=()=>{
    setUser(null)
    localStorage.removeItem('token')
    setNotifications((prev) => [
      ...prev,
      { reason: "Logged out successfully!", id: uuidv4() },
    ]);
  }

  const deleteNotification = (id) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  return (
    <UserContext.Provider value={{ socket, user, registerUser, login, logOut, notifications, setNotifications, deleteNotification }}>
      {props.children}
    </UserContext.Provider>
  )
}
