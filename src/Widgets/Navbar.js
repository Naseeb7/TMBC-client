import React, { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Notifications from "./Notification";
import TMBC from "../assets/TMBC.png";

const Navbar = () => {
  const context = useContext(UserContext);
  const { logOut, notifications, deleteNotification, user, token } = context;
  const navigate = useNavigate();
  const location = useLocation()

  const handleLogout = () => {
    logOut();
    navigate("/login");
  };
  return (
    <div className="flex justify-between items-start p-2">
      <img src={TMBC} alt="TMBC" className="flex p-2 w-1/4 sm:w-1/12" />
      {token && (
        <div className="flex gap-2 flex-row justify-center sm:justify-between items-center w-2/3">
        <div className="hidden sm:flex justify-around w-1/2 p-2 m-2 text-lg font-semibold relative group/links">
          <div className="absolute -bottom-2 -right-2 h-4 w-4 border-b border-r border-black transition-all duration-300 ease-in-out group-hover/links:h-[calc(100%+16px)] group-hover/links:w-[calc(100%+16px)] -z-10"></div>
          <div className="absolute -top-2 -left-2 h-4 w-4 border-t border-l border-black transition-all duration-300 ease-in-out  group-hover/links:h-[calc(100%+16px)] group-hover/links:w-[calc(100%+16px)] -z-10"></div>
          <Link to={"/"} className={`flex hover:-translate-y-1 duration-200 transition-all ${location.pathname === "/" && "text-sky-800"}`}>
            Home
          </Link>
          <Link to={"/weather"} className={`flex hover:-translate-y-1 duration-200 transition-all ${location.pathname === "/weather" && "text-sky-800"}`}>
            Weather
          </Link>
          <Link to={"/chat"} className={`flex hover:-translate-y-1 duration-200 transition-all ${location.pathname === "/chat" && "text-sky-800"}`}>
            Chat
          </Link>
        </div>
        <div className="flex flex-col gap-1 w-full sm:w-1/4 justify-center items-center">
            <div className="flex w-full justify-center p-2 text-lg font-bold text-sky-800">
              {user.firstName} {user.lastName}
            </div>
          <button onClick={handleLogout} className="flex justify-center items-center w-1/2 p-1 rounded-xl bg-sky-950 hover:bg-sky-800 text-sky-100 duration-200 hover:text-sky-200">
            Log Out
          </button>
        </div>
      </div>
      )}

      {/* Notification Widget */}
      <div className="flex flex-col items-end overflow-hidden gap-2 w-3/4 sm:max-w-fit fixed right-0 bottom-20">
        {notifications.map((notification) => {
          return (
            <Notifications
              notification={notification.reason}
              key={notification.id}
              onDelete={() => deleteNotification(notification.id)}
              autoClose={true}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;
