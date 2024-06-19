import React from 'react';
import { useNavigate } from 'react-router-dom';

function Start() {
  const navigate = useNavigate();

  return (
    <div
      className="h-screen w-screen bg-cover bg-center flex flex-col items-center justify-center"
      style={{ backgroundImage: `url(https://4kwallpapers.com/images/wallpapers/cyan-neon-lights-3840x2160-12473.jpg)` }}
    >
      <div className="text-4xl font-bold text-white mb-8" style={{ fontFamily: 'Roboto, sans-serif' }}>
        CHAT WEB
      </div>
      <button
        onClick={() => navigate("Sign/login")}
        className="px-6 py-3  text-white font-bold rounded-lg text-xl transition duration-300"
        style={{ fontFamily: 'Roboto, sans-serif',color : "#58f6f8" }}
      >
        Start
      </button>
    </div>
  );
}

export default Start;
