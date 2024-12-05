import { useState } from "react";
import { Button, Card, Alert } from "flowbite-react";
import ChatWindow from "../../components/User/ChatBot/ChatWindow";
import InputForm from "../../components/User/ChatBot/InputForm";
import { handleChatSubmit } from "../../services/servicesgemini/chatUtilsGemini";

function ChatBot() {
  const [prompt, setPrompt] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    <Card className="w-full max-w-sm md:max-w-full p-6 rounded-none md:rounded-xl font-poppins">
      <h1 className="text-2xl font-bold mb-4 text-center text-green-600">
        Eco-Ai
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
        outline
        gradientMonochrome="failure"
        className="w-full max-w-3xl mx-auto"
        size="lg"
        disabled={loading}
      >
        Refresh Chat
      </Button>
    </Card>
  );
}

export default ChatBot;
