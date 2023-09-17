import React, { useContext, useEffect } from "react";
import { UserContext } from "../Contexts/UserContext";
import chatAppAnimation from "../assets/chatAppAnimation.json";
import weatherAppAnimation from "../assets/weatherAppAnimation.json";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";

const Homepage = () => {
  const context = useContext(UserContext);
  const { token, socket, user, setOnlineUsers } = context;

  useEffect(() => {
    if (socket.current && token !== undefined) {
      socket.current.emit("add-user", user._id);
    }
  }, []); // eslint-disable-line

  useEffect(() => {
    if (socket.current) {
      socket.current.on("online-users", (data) => {
        // const exceptMe=data.filter((id)=> id !== user._id)
        setOnlineUsers(data);
      });
    }
  }, []); // eslint-disable-line

  return (
    <div>
      <div className="flex flex-col items-center p-2 gap-8">
        <div className="flex flex-col w-full md:w-1/3 text-xl font-semibold gap-4">
          At TMBC, we're not just branding experts; we're storytellers with a
          twist. We're the creative strategists who turn your ideas into epic
          success tales.
          <span className="flex text-2xl text-sky-900">Let's rewrite your journey!</span>
        </div>
        <div className="flex w-full flex-col sm:flex-row justify-center gap-8 p-2 pb-8">
          <Link to="/chat" className="flex relative w-full sm:w-1/3 group/chat p-2 animate-enterLeft">
          <div className="absolute -bottom-2 -right-2 h-4 w-4 border-b border-r-2 border-black transition-all duration-300 ease-in-out group-hover/chat:h-[calc(100%+16px)] group-hover/chat:w-[calc(100%+16px)] -z-10"></div>
          <div className="absolute -top-2 -left-2 h-4 w-4 border-t border-l-2 border-black transition-all duration-300 ease-in-out  group-hover/chat:h-[calc(100%+16px)] group-hover/chat:w-[calc(100%+16px)] -z-10"></div>
          <Lottie
            animationData={chatAppAnimation}
            autoPlay
            loop
            className="flex w-full"
          />
          </Link>
          <Link to="/weather" className="flex relative w-full sm:w-1/3 group/weather p-2 animate-enterRight">
          <div className="absolute -bottom-2 -left-2 h-4 w-4 border-b border-l-2  border-black transition-all duration-300 ease-in-out group-hover/weather:h-[calc(100%+16px)] group-hover/weather:w-[calc(100%+16px)] -z-10"></div>
          <div className="absolute -top-2 -right-2 h-4 w-4 border-t border-r-2 border-black transition-all duration-300 ease-in-out  group-hover/weather:h-[calc(100%+16px)] group-hover/weather:w-[calc(100%+16px)] -z-10"></div>
          <Lottie
            animationData={weatherAppAnimation}
            autoPlay
            loop
            className="flex w-full"
          />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
