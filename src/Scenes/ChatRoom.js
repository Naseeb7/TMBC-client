import React, { useContext, useEffect } from "react";
import { UserContext } from "../Contexts/UserContext";
import { MessageContext } from "../Contexts/MessageContext";
import ChatWidget from "../Widgets/ChatWidget";
import loadingAnimation from "../assets/loadinganimation.json";
import Lottie from "lottie-react";

const ChatRoom = () => {
  const userContext = useContext(UserContext);
  const { user, socket, getAllUsers, allUsers, onlineUsers, userLoading } =
    userContext;
  const messageContext = useContext(MessageContext);
  const {
    currentSelected,
    setCurrentSelected,
    typing,
    setTyping,
    messageFrom,
    setMessageFrom,
    message,
    setMessage,
  } = messageContext;

  useEffect(() => {
    getAllUsers();
    setCurrentSelected(null);
  }, []); // eslint-disable-line

  const handleMessage = (e) => {
    setMessage(e.target.value);
    socket.current.emit("typing", {
      from: user._id,
      to: currentSelected._id,
      typing: true,
    });
  };

  const handleUserSelect = (user) => {
    setCurrentSelected(user);
    const from = messageFrom.filter((id) => id !== user._id);
    setMessageFrom(from);
  };

  return (
    <div className="flex flex-col md:flex-row w-full p-2 h-[80vh] relative">
      <div className="flex flex-col h-full p-2 gap-4 w-full md:w-1/4">
        <div className="flex text-xl font-bold text-slate-300">ChatRoom</div>
        {userLoading ? (
          <div className="flex w-full justify-center items-center p-2">
            <Lottie
            animationData={loadingAnimation}
            play
            loop
            className="w-1/4"
          />
          </div>
        ) : (
          <div className="flex flex-col p-2 gap-2">
            {allUsers.map((user) => {
              return (
                <div
                  key={user._id}
                  onClick={() => handleUserSelect(user)}
                  className={`flex justify-between w-full p-3 text-lg font-semibold hover:bg-sky-700 hover:text-slate-300 duration-200 rounded-lg text-sky-900 hover:cursor-pointer ${
                    currentSelected &&
                    currentSelected._id === user._id &&
                    "bg-sky-900 text-slate-300"
                  }`}
                >
                  {user.firstName} {user.lastName}
                  <div
                    className={`flex relative justify-center items-center w-1/12 h-full bg-slate-300 rounded-full text-black z-10`}
                  >
                    {
                      onlineUsers.includes(user._id)
                        ? (<div className="flex absolute w-full h-full rounded-full bg-green-500 -z-10"></div>)
                        : (<div className="flex absolute w-full h-full rounded-full bg-slate-300"></div>)
                    }
                    {messageFrom.includes(user._id) &&
                      messageFrom.filter((id) => id === user._id).length}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {currentSelected ? (
        <ChatWidget
          selectedUser={currentSelected}
          message={message}
          setMessage={setMessage}
          typing={typing}
          setTyping={setTyping}
          handleMessage={handleMessage}
        />
      ) : (
        <div className="flex w-full md:w-3/4 md:h-1/2 justify-center items-center text-2xl font-bold text-slate-400">Select an user to chat.</div>
      )}
    </div>
  );
};

export default ChatRoom;
