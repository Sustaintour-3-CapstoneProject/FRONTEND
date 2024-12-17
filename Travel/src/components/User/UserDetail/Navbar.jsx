import { Navbar } from "flowbite-react";
import { useParams } from "react-router-dom";

const HeaderProfile = () => {
  const { section } = useParams();

  // Format nama halaman berdasarkan parameter `section`
  const pageTitle = section ? section.replace(/-/g, " ") : "Profile";

  return (
    <Navbar
      fluid
      rounded
      className="border-b w-full border-b-[#ABB1BC] sticky top-0 bg-white z-10"
    >
      <Navbar.Brand href="/home">
        <img src="/logo2.png" alt="Tripwise Logo" className="h-8 sm:h-10" />
      </Navbar.Brand>
      <div className="flex flex-row gap-3 items-center">
        <div className="hidden md:block">
        <p className="text-xl text-[#0C4A6E] font-bold">{pageTitle}</p>
        </div>
      </div>
    </Navbar>
  );
};

export default HeaderProfile;
