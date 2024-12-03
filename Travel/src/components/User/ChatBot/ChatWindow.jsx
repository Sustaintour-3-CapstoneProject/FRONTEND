import React from "react";
import ReactMarkdown from "react-markdown";

const ChatWindow = ({ chatHistory, loading }) => {
  return (
    <div className="flex flex-col space-y-4 h-96 overflow-y-auto  rounded-lg p-4 mb-4 bg-white">
      {chatHistory.length === 0 && !loading ? (
        <p className="text-center text-gray-500">
          Silahkan kirim pertanyaan tentang destinasi!
        </p>
      ) : (
        chatHistory.map((chat, index) => (
          <div key={index}>
            {chat.role === "user" ? (
              <div className="flex justify-end">
                <p className="bg-blue-500 text-white p-3 rounded-xl rounded-tr-none max-w-xl text-md break-words">
                  {chat.parts[0].text}
                </p>
              </div>
            ) : (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 p-3 rounded-xl rounded-tl-none max-w-xs text-sm break-words">
                  <ReactMarkdown>{chat.parts[0].text}</ReactMarkdown>
                </div>
              </div>
            )}
          </div>
        ))
      )}
      {loading && (
        <div className="text-center text-gray-500">Generating response...</div>
      )}
    </div>
  );
};

export default ChatWindow;
