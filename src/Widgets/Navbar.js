import React, { useContext } from 'react'
import { UserContext } from '../Contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import Notifications from './Notification';

const Navbar = () => {
  const context = useContext(UserContext);
  const { logOut, notifications, deleteNotification } = context;
  const navigate=useNavigate()

  const handleLogout=()=>{
    logOut()
    navigate('/login')
  }
  return (
    <div className='flex justify-between'>
      Navbar
      <button onClick={handleLogout} className="flex border">Log Out</button>

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
  )
}

export default Navbar
