import { useState } from "react";
import { Button, Card, Alert } from "flowbite-react";
import ChatWindow from "../../components/User/ChatBot/ChatWindow";
import InputForm from "../../components/User/ChatBot/InputForm";
import { handleChatSubmit } from "../../services/servicesgemini/chatUtilsGemini";
import { HiRefresh } from "react-icons/hi";
import useAuthStore from "../../store/authStore";
function ChatBot() {
  const [prompt, setPrompt] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { auth, clearAuth } = useAuthStore(); // Ambil data autentikasi dan fungsi logout
  // Ambil data autentikasi dan fungsi logout
  const handleSubmit = (event) =>
    handleChatSubmit({
      event,
      prompt,
      setLoading,
      setError,
      setChatHistory,
      chatHistory,
      setPrompt,
    });

  const handleRefresh = () => {
    setChatHistory([]);
    setError("");
    setPrompt("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  return (
    <div className="w-full  max-w-sm my-6 space-y-4 md:max-w-full md:w-full  rounded-none font-poppins">
      <h1 className="text-2xl leading-5 font-bold text-center text-sky-600">
        Travel Wise
      </h1>
      <ChatWindow chatHistory={chatHistory} loading={loading} />

      {error && (
        <Alert color="failure" className="mb-4">
          <span>{error}</span>
        </Alert>
      )}

      <InputForm
        prompt={prompt}
        setPrompt={setPrompt}
        loading={loading}
        handleSubmit={handleSubmit}
        handleKeyDown={handleKeyDown}
      />

      <Button
        onClick={handleRefresh}
        color="customBlue"
        className="w-full max-w-xs mx-auto "
        size="lg"
        disabled={loading}
      >
        Refresh Chat
        <HiRefresh className="ml-3 h-6 w-5" />
      </Button>
    </div>
  );
}

export default ChatBot;
