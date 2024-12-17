import React from "react";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const NotFoundPageUser = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-sky-500">
      <img src="/notfound.svg" alt="404 Not Found" className="w-64 h-64" />
      <h1 className="text-5xl font-bold mt-8">Page Not Found</h1>
      <p className="text-lg mt-4 text-gray-500">
        Oops! The page you are looking for does not exist.
      </p>
      <Button
        onClick={() => navigate("/home")}
        className="mt-6 bg-sky-500 hover:bg-sky-600 text-white"
      >
        Go Back to Home
      </Button>
    </div>
  );
};

export default NotFoundPageUser;
