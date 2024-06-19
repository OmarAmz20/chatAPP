import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  getFriends,
  getInvitations,
  searchUser,
  sendInvitation,
  setResption,
} from "../redux/redux";
import User from "./User";
import { Link, useNavigate } from "react-router-dom";
import InvitModal from "./InvitModal";

export default function Search() {
  const user = useSelector((state) => state.chat.user);
  const invitations = useSelector((state) => state.chat.invitations);
  const friends = useSelector((state) => state.chat.friends);
  const [search, setSearch] = useState("");
  const [invitedUsers, setInvitedUsers] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const displayModal = () => {
    document.getElementById("modal").style.top = "50%";
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log("Dispatching getInvitations with user:", user);
      await dispatch(getInvitations({ user }));
      await dispatch(getFriends({ user }));
      if (search === "") {
        await dispatch(fetchUsers(user));
      } else {
        await dispatch(fetchUsers(user));
        dispatch(searchUser(search));
      }
    };

    fetchData();
  }, [search, user, dispatch]);

  useEffect(() => {
    if (!user) {
      navigate("/Sign/login");
      return;
    }
  }, [user, navigate]);

  const users = useSelector((state) => state.chat.users) || [];
  console.log(friends);
  console.log(invitations);

  const handleInvite = (receiver) => {
    dispatch(sendInvitation({ sender: user, receiver, status: "pending" }));
    setInvitedUsers((prev) => ({ ...prev, [receiver]: true }));
  };

  return (
    <div className="p-6">
      <InvitModal invitations={invitations} />

      <div className="mb-4 flex justify-between px-5 gap-5">
        <div className="text-xl font-bold">{user}</div>
        <div>
          <button
            onClick={displayModal}
            className="px-4 py-2 bg-white text-blue-400 rounded-md hover:bg-blue-50"
          >
            Invitations
          </button>
          <button
            onClick={() => {
              document.getElementById("friends").classList.toggle("opacity-0");
            }}
            className="px-4 py-2 bg-white text-blue-400 rounded-md hover:bg-blue-50"
          >
            Search
          </button>
        </div>
      </div>
      <div className="text-xl font-bold mb-4 relative">List Friends</div>
      <div className="w-full flex flex-col items-center px-2 justify-center gap-5 my-10 absolute">
        {friends && friends.length > 0 ? (
          friends.map((e) => (
            <div className="w-full p-2 flex justify-center" key={e.friend}>
              <Link
                to={"./chat"}
                className="w-1/3"
                onClick={() => dispatch(setResption(e.friend))}
              >
                <User name={e.friend} />
              </Link>
            </div>
          ))
        ) : (
          <div className="text-center w-full mt-4">No friends found</div>
        )}
      </div>
      <div
        id="friends"
        style={{ overflowY: "scroll", height: "600px" }}
        className="w-96 absolute duration-75 rounded-xl border-gray-400 opacity-0 border-2"
      >
        <div className="w-full flex flex-wrap justify-center gap-5 my-10">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users..."
            className="w-full p-3 mx-3 sticky top-2 border border-gray-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          />

          {users.map((e) => (
            <div className="w-full px-2 flex gap-5 justify-center" key={e.name}>
              <User name={e.name} email={e.email} />
              <button
                className={`px-4 py-2 rounded-md transition-all duration-200 ${
                  invitedUsers[e.name]
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-green-500 text-white hover:bg-green-600"
                }`}
                onClick={() => handleInvite(e.name)}
                disabled={invitedUsers[e.name]}
              >
                {invitedUsers[e.name] ? "Invited" : "Invite"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
