import React from "react";
import useAuthStore from "../../../store/authStore";
const WelcomeChat = () => {
  const { auth } = useAuthStore();
  return (
    <>
      <div className="flex flex-col items-center">
        <img src="/Chat/chatbot.jpg" alt="chatbot" className="w-20 h-20" />
        <span className="text-sm font-medium text-gray-700">
          Hi, {auth.first_name || "Traveler"}
        </span>
        <p className="text-center text-gray-500">
          Silahkan kirim pertanyaan tentang destinasi!
        </p>
      </div>
      <div className="flex justify-start items-start space-x-3  p-4 rounded-lg ">
        {/* Avatar Bot */}
        <img
          src="/Chat/chatbot.jpg" // Ganti dengan path gambar bot Anda
          alt="Chatbot Avatar"
          className="w-8 h-8 rounded-full"
        />

        {/* Pesan Bot */}
        <div className="text-gray-800 text-sm leading-relaxed bg-slate-100 p-4 rounded-lg rounded-tl-none">
          <p>
            Hi there! 👋 I'm here to help you with your travel plans. How can I
            assist you today? 😊
          </p>
        </div>
      </div>
    </>
  );
};

export default WelcomeChat;
