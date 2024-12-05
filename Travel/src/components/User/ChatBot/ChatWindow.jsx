import ReactMarkdown from "react-markdown";

import WelcomeChat from "./WelcomeChat";

const ChatWindow = ({ chatHistory, loading }) => {
  return (
    <div className="flex flex-col space-y-4 h-[560px] md:h-[500px] overflow-y-auto rounded-lg pt-0 p-4 mb-4 bg-white">
      {chatHistory.length === 0 && !loading ? (
        <WelcomeChat />
      ) : (
        chatHistory.map((chat, index) => (
          <div key={index} className="flex items-start">
            {chat.role === "user" ? (
              <div className="flex justify-end w-full">
                <p className="bg-sky-600 text-white p-3 rounded-xl rounded-tr-none max-w-xl text-md break-words">
                  {chat.parts[0].text}
                </p>
              </div>
            ) : (
              <div className="flex space-x-2 items-start">
                <img
                  src="/Chat/chatbot.jpg"
                  alt="chatbot"
                  className="w-8 h-8 rounded-full"
                />
                <div className="bg-gray-100 text-gray-800 p-3 rounded-xl rounded-tl-none max-w-xl text-sm break-words">
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
