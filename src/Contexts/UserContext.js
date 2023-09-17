import { createContext, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

const BaseUrl=process.env.REACT_APP_BASE_URL

export const UserContext = createContext()

export const UserState = (props) => {
  const [onlineUsers, setOnlineUsers]=useState([])
  const [allUsers, setAllUsers]=useState([])
  const [notifications, setNotifications] = useState([]);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const [loading, setLoading]=useState(false)
  const [userLoading, setUserLoading]=useState(false)
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
  },[]) //eslint-disable-line

  const registerUser =async (input) => {
    setLoading(true)
    const response=await fetch(`${BaseUrl}/auth/register`,{
      method: "POST",
      headers : {'Content-Type' : 'application/json'},
      body : JSON.stringify(input),
    })
    const data=await response.json() //eslint-disable-line
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
    setLoading(false)
  };

  const login =async (input) => {
    setLoading(true)
    const response=await fetch(`${BaseUrl}/auth/login`,{
      method: "POST",
      headers : {'Content-Type' : 'application/json'},
      body : JSON.stringify(input),
    })
    const data=await response.json()
    if(response.status===200){
    localStorage.setItem('token',data.token)
    localStorage.setItem('user',JSON.stringify(data.user))
    navigate('/home')
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
    setLoading(false)
  };

  const logOut=()=>{
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    setNotifications((prev) => [
      ...prev,
      { reason: "Logged out successfully!", id: uuidv4() },
    ]);
  }

  const getAllUsers = async () => {
    setUserLoading(true)
    const response = await fetch(`${BaseUrl}/users/${user._id}/getallusers`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    const exceptMe=data.filter((obj)=>obj._id !== user._id)
    setAllUsers(exceptMe)
    setUserLoading(false)
  };

  const deleteNotification = (id) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  return (
    <UserContext.Provider value={{ socket, user, token, registerUser, login, logOut, getAllUsers, notifications, setNotifications, deleteNotification, onlineUsers, setOnlineUsers, allUsers, loading, userLoading }}>
      {props.children}
    </UserContext.Provider>
  )
}
