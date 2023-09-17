import React, { useContext, useState } from "react";
import { UserContext } from "../Contexts/UserContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Notifications from "./Notification";
import TMBC from "../assets/TMBC.png";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const context = useContext(UserContext);
  const { logOut, notifications, deleteNotification, user } = context;
  const [mobileMenu, setMobileMenu]=useState(false)
  const navigate = useNavigate();
  const location = useLocation()

  const handleLogout = () => {
    logOut();
    navigate("/login");
    setMobileMenu(false)
  };
  return (
    <div className="flex justify-between items-center p-2">
      <img src={TMBC} alt="TMBC" className="flex p-2 w-1/4 md:w-1/12" />
      <div onClick={()=>setMobileMenu(true)} className={`flex md:hidden ${mobileMenu && "hidden"} hover:cursor-pointer`}>
        <Menu />
      </div>
        <div className={`${mobileMenu ? "flex" : "hidden"} h-full md:flex gap-2 flex-col md:flex-row fixed right-0 bg-sky-100/70 md:bg-transparent top-0 z-20 md:static justify-between md:justify-between items-center w-2/3 animate-enterRight md:animate-none`}>
          <div className="flex md:hidden w-full justify-end p-2">
            <X onClick={()=>setMobileMenu(false)} className="hover:cursor-pointer"/>
          </div>
        <div className="flex flex-col md:flex-row items-center justify-around w-1/2 h-1/2 p-2 m-2 text-lg font-semibold">
          <Link to={"/"} onClick={()=>setMobileMenu(false)} className={`flex p-1 hover:-translate-y-1 duration-200 transition-all ${location.pathname === "/" && "text-sky-800"}`}>
            Home
          </Link>
          <Link to={"/weather"} onClick={()=>setMobileMenu(false)} className={`flex p-1 hover:-translate-y-1 duration-200 transition-all ${location.pathname === "/weather" && "text-sky-800"}`}>
            Weather
          </Link>
          <Link to={"/chat"} onClick={()=>setMobileMenu(false)} className={`flex p-1 hover:-translate-y-1 duration-200 transition-all ${location.pathname === "/chat" && "text-sky-800"}`}>
            Chat
          </Link>
        </div>
        <div className="flex flex-col gap-1 w-full md:w-1/4 justify-center items-center h-1/4">
            <div className="flex w-full justify-center p-2 text-lg font-bold text-sky-800">
              {user.firstName} {user.lastName}
            </div>
          <button onClick={handleLogout} className="flex justify-center items-center w-1/2 p-1 rounded-xl bg-sky-950 hover:bg-sky-800 text-slate-300 duration-200 hover:text-sky-200">
            Log Out
          </button>
        </div>
      </div>

      {/* Notification Widget */}
      <div className="flex flex-col items-end overflow-hidden gap-2 w-3/4 md:max-w-fit fixed right-0 bottom-20">
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
