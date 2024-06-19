import React from "react";
import Nav from "./nav";
import { Route, Routes } from "react-router-dom";
import Search from "./search";
import Chat from "./Chat";
import Profile from "./profile";


export default function Home() {
  return (
    <div>
      <Nav />
      <div>
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="chat" element={<Chat />} />
          <Route path="profile/:name" element={<Profile />} />

        </Routes>
      </div>
    </div>
  );
}
