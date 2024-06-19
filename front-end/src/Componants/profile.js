import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import logo from "./image 2.svg";
import { IoCaretBack } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setResption } from "../redux/redux";

export default function Profile() {
  const { name } = useParams("name");
  const [user, setUser] = useState(null);
  const user1 = useSelector((state) => state.chat.user) ;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.post("http://localhost:4000/search", {
          user: name,
        });
        setUser(response.data[0]);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getUser();
  }, [name]);
  console.log(user);
  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div>
      <IoCaretBack className="w-8 h-8" onClick={() => user.name == user1 ? navigate("../") : navigate(-1) } />
      <div className="flex flex-col justify-evenly mt-32 p-6 max-w-md mx-auto w-96 h-96 bg-white rounded-xl shadow-md space-y-4 ">
        <div className="flex justify-center w-full">
          <img src={logo} className="w-32 h-32 rounded-full" alt="Profile" />
        </div>

        <h1 className="text-2xl font-bold">{user.name}</h1>
        <p className="text-gray-700 font-semibold">{user.email}</p>
        { user.name !== user1 &&  <Link  to={`../chat`} onClick={() => dispatch(setResption(user.name))}>
          <button className="px-4 py-2 bg-white text-blue-400 rounded-md hover:bg-blue-50">
            Contact
          </button>
        </Link> }
       
      </div>
    </div>
  );
}
