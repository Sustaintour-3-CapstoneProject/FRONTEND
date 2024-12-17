import RegisterForm from "../components/Register/RegisterForm";
import RegisterHeader from "../components/Register/RegisterHeader";
import useRegister from "../hooks/useRegister";

const RegisterUser = () => {
  const { handleRegister, isProcessing, errorMessage, successMessage } =
    useRegister();

  return (
    <div className="min-h-screen relative">
      <div
        className="absolute inset-0 bg-cover bg-bottom sm:bg-center"
        style={{ backgroundImage: "url('/login.jpg')" }}
      ></div>

      <div className="relative z-10 flex flex-col md:flex-row min-h-screen justify-end md:justify-end">
        <div className="w-full rounded-t-lg md:rounded-tr-none md:w-1/2 bg-zinc-100 flex items-center justify-center px-6 py-8 md:rounded-s-3xl md:px-12 dark:bg-gray-800">
          <div className="w-full h-[650px] sm:h-full max-w-sm flex flex-col items-center justify-center text-center">
            <RegisterHeader />
            <RegisterForm
              handleRegister={handleRegister}
              isProcessing={isProcessing}
              successMessage={successMessage}
              errorMessage={errorMessage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;
