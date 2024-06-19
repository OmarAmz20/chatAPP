import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { acceptInvitation, getFriends, refuseInvitation } from "../redux/redux";
import { io } from "socket.io-client";
import { IoCloseSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const socket = io("http://localhost:4000");

export default function InvitModal({ invitations }) {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const user = useSelector((state) => state.chat.user);

  useEffect(() => {
    socket.on("invitationAccepted", (invitationId) => {
      // Update UI or Redux state when an invitation is accepted
      console.log("Invitation accepted:", invitationId);
    });

    socket.on("invitationRefused", (invitationId) => {
      // Update UI or Redux state when an invitation is refused
      console.log("Invitation refused:", invitationId);
    });

    return () => {
      socket.off("invitationAccepted");
      socket.off("invitationRefused");
    };
  }, []);

  const closeModal = () => {
    document.getElementById("modal").style.top = "-500px";
  };

  const handleAccept = async(e) => {
    await dispatch(acceptInvitation({ sender: e.sender, receiver: user, id: e._id }));
    socket.emit("acceptInvitation", e._id);
    document.getElementById(e._id).remove()
    await dispatch(getFriends({ user }));
    
  };

  const handleRefuse = (id) => {
    dispatch(refuseInvitation(id));
    socket.emit("refuseInvitation", id);
  };

  return (
    <div
      id="modal"
      className="modal z-10 flex flex-col p-6 bg-white border border-gray-300 rounded-lg shadow-md max-w-lg mx-auto"
    >
      <IoCloseSharp className=" w-8 h-8" onClick={closeModal} />
      <h2 className="text-2xl font-bold text-gray-900 mb-5">Invitations</h2>
      {invitations.map((e, index) => (
        <div
        id={e._id}
          key={index}
          className="flex flex-col md:flex-row justify-between items-center mb-4 p-4 bg-gray-100 border border-gray-200 rounded-lg"
        >
          <div className="flex flex-col mb-4 md:mb-0 md:mr-4">
            <h3 className="text-lg font-medium text-gray-800">{e.sender}</h3>
            <p className="text-gray-600">{new Date(e.createdAt).toLocaleString()}</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => handleAccept(e)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-150 ease-in-out"
            >
              Accept
            </button>
            <button
              onClick={() => handleRefuse(e._id)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-150 ease-in-out"
            >
              Refuse
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
