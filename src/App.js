import { UserState } from "./Contexts/UserContext";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./Widgets/Navbar";
import LoginPage from "./Scenes/LoginPage";
import Homepage from "./Scenes/Homepage";
import ChatRoom from "./Scenes/ChatRoom";
import WeatherRoom from "./Scenes/WeatherRoom";
import { MessageState } from "./Contexts/MessageContext";
import { WeatherState } from "./Contexts/WeatherContext";

function App() {
  const token = localStorage.getItem("token");
  const location=useLocation()
  return (
    <>
        <UserState>
          <MessageState>
            <WeatherState>
              {(location.pathname !== "/login" ) && (<Navbar />)}
              <Routes>
                <Route exact path="/login" element={<LoginPage />} />
                <Route
                  exact
                  path="/"
                  element={
                    token ? (
                      <Homepage />
                    ) : (
                      <Navigate to={"/login"} />
                    )
                  }
                />
                <Route
                  exact
                  path="/chat"
                  element={
                    token ? (
                      <ChatRoom />
                    ) : (
                      <Navigate to={"/login"} />
                    )
                  }
                />
                <Route
                  exact
                  path="/weather"
                  element={
                    token ? (
                      <WeatherRoom />
                    ) : (
                      <Navigate to={"/login"} />
                    )
                  }
                />
              </Routes>
            </WeatherState>
          </MessageState>
        </UserState>
    </>
  );
}

export default App;
