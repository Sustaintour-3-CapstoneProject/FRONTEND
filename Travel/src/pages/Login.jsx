import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import LoginForm from "../components/Login/LoginForm";
import LoginHeader from "../components/Login/LoginHeader";

const Login = () => {
  const { handleLogin, isProcessing, error, successMessage } = useLogin();

  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 bg-cover bg-top sm:bg-center bg-[url('/login.jpg')]"></div>
      <div className="relative z-10 flex flex-col md:flex-row min-h-screen justify-end md:justify-start">
        <div className="w-full md:min-h-full rounded-t-lg md:rounded-tl-none md:w-1/2 bg-zinc-100 flex items-center justify-center px-6 py-8 md:rounded-e-3xl md:px-12 dark:bg-gray-800">
          <div className="w-full max-w-sm h-[650px] sm:h-full flex flex-col items-center justify-center">
            <LoginHeader />
            <LoginForm
              handleLogin={handleLogin}
              isProcessing={isProcessing}
              error={error}
              successMessage={successMessage}
            />
            <p className="text-sm mt-4 text-center">
              Dont have an account?{" "}
              <Link
                to="/register"
                className="text-blue-500 hover:underline font-semibold"
              >
                Register Now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
