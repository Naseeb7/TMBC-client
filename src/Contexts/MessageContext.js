import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

const BaseUrl = process.env.REACT_APP_BASE_URL;

export const MessageContext = createContext();

export const MessageState = (props) => {
  const context = useContext(UserContext);
  const { socket } = context;
  const [messages, setMessages] = useState([]);
  const [message, setMessage]=useState("")
  const [messageFrom, setMessageFrom] = useState([]);
  const [sentMessage, setSentMessage] = useState(null);
  const [messageData, setMessageData] = useState(null);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentSelected, setCurrentSelected] = useState(null);
  const [typing, setTyping] = useState(false);
  const [typingData, setTypingData] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const getAllMessages = async (selectedUser) => {
    const response = await fetch(
      `${BaseUrl}/message/${user._id}/getallmessages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          from: user._id,
          to: selectedUser._id,
        }),
      }
    );
    const data = await response.json();
    setMessages(data);
  };

  const sendMessage = async (message) => {
    if (message !== "") {
      socket.current.off("send-message");
      socket.current.emit("send-message", {
        from: user._id,
        to: currentSelected._id,
        message: message,
      });
      setSentMessage(message);
      const response = await fetch(
        `${BaseUrl}/message/${user._id}/addmessage`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "content-Type": "application/json",
          },
          body: JSON.stringify({
            from: user._id,
            to: currentSelected._id,
            message: message,
          }),
        }
      );
      // eslint-disable-next-line
      const data = await response.json();
    }
  };

  const updateMessage=(data)=>{
    if (data.from === currentSelected._id) {
      setArrivalMessage({
        fromSelf: false,
        message: data.message,
        created: new Date().getTime(),
      });
    } else {
      setMessageFrom((prev) => {
        return [...prev, data.from];
      });
    }
  }

  useEffect(()=>{
    if(messageData){
      updateMessage(messageData)
    }
  },[messageData]) // eslint-disable-line

  const updateTyping=(data)=>{
    if (data.from === currentSelected._id) {
      setTyping(data.typing);
            setTimeout(() => {
              setTyping(false);
            }, 1000);
    }
  }

  useEffect(()=>{
    if(typingData){
      updateTyping(typingData)
    }
  },[typingData]) // eslint-disable-line

  useEffect(() => {
    if (socket.current) {
        socket.current.off("message-receive");
        socket.current.on("message-receive", (data) => {
          setMessageData(data)
        });

        socket.current.off("typing-data");
        socket.current.on("typing-data", (data) => {
            setTypingData(data)
        });
    }
    setMessage("")
  }, [currentSelected]); //eslint-disable-line

  useEffect(() => {
    if (arrivalMessage) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage]); // eslint-disable-line

  useEffect(() => {
    if (sentMessage) {
      const msgs = [...messages];
      msgs.push({
        fromSelf: true,
        message: sentMessage,
        created: new Date().getTime(),
      });
      setMessages(msgs);
    }
  }, [sentMessage]); // eslint-disable-line

  return (
    <MessageContext.Provider
      value={{
        messages,
        setMessages,
        getAllMessages,
        sendMessage,
        sentMessage,
        setSentMessage,
        arrivalMessage,
        setArrivalMessage,
        messageFrom,
        setMessageFrom,
        currentSelected,
        setCurrentSelected,
        typing,
        setTyping,
        message,
        setMessage
      }}
    >
      {props.children}
    </MessageContext.Provider>
  );
};
