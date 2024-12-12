import React, { useRef, useEffect } from "react";
import { Textarea, Button } from "flowbite-react"; // Import Flowbite React components
import { HiPaperAirplane } from "react-icons/hi";
const InputForm = ({
  prompt,
  setPrompt,
  loading,
  handleSubmit,
  handleKeyDown,
}) => {
  const inputRef = useRef(null);

  const adjustTextareaHeight = () => {
    const textarea = inputRef.current;
    if (textarea) {
      textarea.style.height = "auto";

      if (textarea.scrollHeight > 80) {
        textarea.style.height = `${80}px`;
        textarea.style.overflowY = "auto";
      } else {
        textarea.style.height = `${textarea.scrollHeight}px`;
        textarea.style.overflowY = "hidden";
      }
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [prompt]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center mx-auto bg-gray-100 p-3 rounded-lg shadow-md space-x-2 h-13 w-full max-w-3xl"
    >
      <Textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={handleKeyDown}
        ref={inputRef}
        rows={1}
        placeholder="Ask Something..."
        disabled={loading}
        className="flex-1 justify-center resize-none border-none bg-gray-100 text-gray-800 focus:outline-none focus:ring-0"
      ></Textarea>

      <button
        type="submit"
        className=" rounded-lg bg-transparent text-black"
        size="md"
        disabled={loading}
      >
        {loading ? "..." : <HiPaperAirplane size={24} />}
      </button>
    </form>
  );
};

export default InputForm;
