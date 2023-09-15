import { UserContext, UserState } from "./Contexts/UserContext";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./Widgets/Navbar";
import { useContext, useState } from "react";
import LoginPage from "./Scenes/LoginPage";
import Homepage from "./Scenes/Homepage";
import ChatRoom from "./Scenes/ChatRoom";
import WeatherRoom from "./Scenes/WeatherRoom";
import { MessageState } from "./Contexts/MessageContext";

function App() {
  const token = localStorage.getItem("token");
  return (
    <>
      <BrowserRouter>
        <UserState>
          <MessageState>
            <Navbar />
            <Routes>
              <Route exact path="/login" element={<LoginPage />} />
              <Route
                exact
                path="/"
                element={token !== undefined ? <Homepage /> : <Navigate to={"/login"} />}
              />
              <Route
                exact
                path="/chat"
                element={token !== undefined ? <ChatRoom /> : <Navigate to={"/login"} />}
              />
              <Route
                exact
                path="/weather"
                element={token !== undefined ? <WeatherRoom /> : <Navigate to={"/login"} />}
              />
            </Routes>
          </MessageState>
        </UserState>
      </BrowserRouter>
    </>
  );
}

export default App;
