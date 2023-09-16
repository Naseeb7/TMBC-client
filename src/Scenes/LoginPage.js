import React, { useContext } from 'react'
import LoginForm from '../Widgets/LoginForm'
import TMBC from "../assets/TMBC.png";
import Notifications from '../Widgets/Notification';
import { UserContext } from '../Contexts/UserContext';

const LoginPage = () => {
  const context = useContext(UserContext);
  const { notifications, deleteNotification } = context;
  return (
    <div className='flex flex-col sm:flex-row justify-center gap-8 items-center p-2 w-full sm:h-[100vh]'>
      <img src={TMBC} alt="TMBC" className="flex p-2 w-1/2 sm:w-1/4" />
      <LoginForm />

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

export default LoginPage
