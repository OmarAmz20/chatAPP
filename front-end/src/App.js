import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginTemplte from "./Componants/LoginTep";
import Home from "./Componants/Home";
import Chat from "./Componants/Chat";
import Profile from "./Componants/profile";
import Start from "./Componants/start";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/Sign/*" element={<LoginTemplte />} />
        <Route path="/home" element={<Home />}>
          <Route path="chat" element={<Chat />} />
          <Route path="profile/:name" element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
