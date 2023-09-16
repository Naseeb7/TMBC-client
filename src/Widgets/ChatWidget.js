import React, { useContext, useEffect, useRef } from 'react'
import { MessageContext } from '../Contexts/MessageContext';
import { v4 as uuidv4 } from "uuid";
import { SendHorizonal } from 'lucide-react';
import typingAnimation from "../assets/typingAnimation.json";
import Lottie from "lottie-react";

const ChatWidget = ({selectedUser, message, setMessage, typing, handleMessage}) => {
  const messageContext = useContext(MessageContext);
  const { getAllMessages, messages, sendMessage } = messageContext;
  const scrollRef=useRef()

  useEffect(() => {
    getAllMessages(selectedUser);
  }, [selectedUser]); // eslint-disable-line

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
}, [messages, typing]); // eslint-disable-line

const handleSend=()=>{
  sendMessage(message)
  setMessage("")
}

  return (
    <div
      className="flex flex-col relative bg-slate-200 w-full gap-2 p-2 rounded-xl animate-scaleDown origin-top"
    >
      <div className="flex gap-2 justify-self-end text-2xl font-bold items-center text-slate-400">
        ChatBox
        {typing && (
          <div className="flex w-full text-sm font-semibold">
              typing...
            </div>
        )}
      </div>
      <div className="flex flex-col h-[49vh] overflow-auto p-2 bg-slate-100 rounded-xl gap-2">
        <div className="flex flex-col pt-2 w-full rounded-xl gap-1">
          {messages.map((message) => {
            return (
              <div
                key={uuidv4()}
                ref={scrollRef}
                className={`flex ${
                  message.fromSelf ? "justify-end" : "justify-start"
                } w-full p-1`}
              >
                {message.fromSelf ? (
                  <div className="flex w-2/3 justify-end">
                    {message.type === "image" ? (
                      <div className="flex sm:w-2/3 flex-col p-2 mx-2 items-end bg-slate-700 text-teal-50 rounded-2xl rounded-tr-none">
                        <img
                          className="flex border rounded-xl"
                          src={message.file}
                          alt="message"
                        />
                        <div className="flex p-1">{message.message}</div>
                      </div>
                    ) : (
                      <div className="flex mx-2 p-2 px-3 bg-slate-700 text-teal-50 rounded-2xl rounded-tr-none">
                        {message.message}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex w-2/3 justify-start items-center">
                    {message.type === "image" ? (
                      <div className="flex sm:w-2/3 flex-col items-start p-2 mx-2 bg-teal-700 text-slate-50  rounded-2xl rounded-tl-none">
                        <img
                          className="flex border rounded-xl"
                          src={message.file}
                          alt="received "
                        />
                        <div className="flex p-1">{message.message}</div>
                      </div>
                    ) : (
                      <div className="flex mx-2 p-2 px-3 bg-teal-700 text-slate-50 rounded-2xl rounded-tl-none">
                        {message.message}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
          {typing && (
            <div className="flex w-full mx-2">
              <Lottie
                animationData={typingAnimation}
                autoPlay
                loop
                className="flex w-1/12"
              />
            </div>
          )}
        </div>
      </div>
        <div className="flex justify-around items-center rounded-b-xl p-2 gap-2">
          <textarea
            value={message}
            onChange={handleMessage}
            placeholder="Konichiwa..."
            className="flex w-4/5 p-1 rounded-lg text-teal-800 outline-none focus:bg-teal-50 resize-none"
            rows={2}
          />
          <div className="flex w-1/5 justify-center items-center text-teal-700">
            <button
              onClick={handleSend}
              className="flex hover:translate-x-1 duration-200"
            >
              <SendHorizonal />
            </button>
          </div>
        </div>
    </div>
  )
}

export default ChatWidget
