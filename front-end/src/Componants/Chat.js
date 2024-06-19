import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addMsg, getMsg } from "../redux/redux";
import { IoMdSend } from "react-icons/io";
import { IoCaretBack } from "react-icons/io5";
import logo from "./image 2.svg";
import io from "socket.io-client";
const socket = io("http://localhost:4000");

export default function Chat() {
  const dispatch = useDispatch();
  const [msg, setMsg] = useState("");
  const chatContent = useSelector((state) => state.chat.chatContent);
  const user1 = useSelector((state) => state.chat.user);
  const user2 = useSelector((state) => state.chat.reception);
  const chatEndRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getMsg({ user1, user2 }));

    socket.on("message", (newMessage) => {
      dispatch(getMsg({ user1, user2 })); // Re-fetch messages on new message
    });

    return () => {
      socket.off("message");
    };
  }, [user1, user2, dispatch]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView();
    }
  }, [chatContent]);

  const sendMessage = () => {
    if (msg.length > 0) {
      dispatch(addMsg({ user1, user2, msg }));
      setMsg("");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="w-full flex gap-3">
      <div className="w-1/6 bg-blue-400 flex flex-col items-center gap-5 pt-20 text-white">
        <img src={logo} className="w-24 h-24" alt="Logo" />
        <h1 className="font-bold text-xl">{user2}</h1>
        <Link to={"../profile/"+user2}>
        <button  className="px-4 py-2 bg-white text-blue-400 rounded-md hover:bg-blue-50">
          Show Profile
        </button>
        </Link>
      </div>

      <div className=" mx-auto w-5/6 p-4">
        <IoCaretBack className="w-8 h-8" onClick={() => navigate(-1)} />
        <h1 className="text-2xl font-bold mb-4">
          Chat between You and {user2}
        </h1>
        <div
          style={{ height: "600px" }}
          className="w-full  border-2 border-gray-300 overflow-y-scroll p-4 mb-4 rounded-2xl"
        >
          {chatContent.length > 0 ? (
            chatContent.map((msg, index) => (
              <div key={index} className="mb-2 flex flex-col gap-5">
                {msg.messages.map((e, idx) => (
                  <div
                    key={idx}
                    className={`py-2 px-3 rounded-lg flex flex-col gap-1 text-left mb-2 min-w-[150px] max-w-[100%] ${
                      e.user === user1
                        ? "bg-blue-100  self-end"
                        : "bg-green-100  self-start"
                    }`}
                    style={{
                      wordWrap: "break-word",
                      overflowWrap: "break-word",
                    }}
                  >
                    <div className="font-semibold">{e.user}</div>
                    <div>{e.msg}</div>
                    <div className="text-sm text-gray-500">
                      {new Date(e.createdAt).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <p>No messages</p>
          )}
          <div ref={chatEndRef} />
        </div>
        <div className="flex space-x-2">
          <input
            className="flex-1 p-2 border border-3 border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            value={msg}
            onKeyDown={handleKeyDown}
            onChange={(e) => setMsg(e.target.value)}
          />
          <button
            className=" w-14 h-14 flex justify-center items-center rounded-full bg-blue-500 text-white  hover:bg-blue-600"
            onClick={sendMessage}
          >
            <IoMdSend className="w-8 h-8" />
          </button>
        </div>
      </div>
    </div>
  );
}
