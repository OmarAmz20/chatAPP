import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./login";
import Register from "./register";
import logo from "./Chat (1) 1.svg";

function LoginTemplte() {
  return (
    <div className="flex w-full min-h-screen " style={{height : "750px"}} >
      <div className="w-1/2">
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </div>
      <div className="w-1/2 h-full border border-xl bg-blue-400 relative rounded-s-3xl">
        <img src={logo} className=" w-80 h-80 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" alt="logo" />
      </div>
    </div>
  );
}

export default LoginTemplte;
