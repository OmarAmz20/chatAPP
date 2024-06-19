import React from "react";
import logo from "./Chat (1) 1.svg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Nav() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.chat.user) ;

  const LogOut = () => {
    navigate("/Sign/login");
  };
  return (
    <div>
      <div className="flex justify-between px-10 bg-blue-400 h-20 items-center">
        <img src={logo} className="w-32 h-32 " />
        <div className="flex gap-10" >
          <button className="text-white font-bold" onClick={() => navigate("profile/"+user)}>
            Profile
          </button>
          <button className="text-white font-bold" onClick={LogOut}>
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
