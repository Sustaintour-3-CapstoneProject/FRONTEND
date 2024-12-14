import { useState, useEffect } from "react";
import { Navbar, Button, Dropdown, Avatar } from "flowbite-react";
import { NavLink, useLocation, Link } from "react-router-dom";
import useAuthStore from "../../../store/authStore";

const NavigationBar = () => {
  const { auth, registerAuth, clearAuth } = useAuthStore(); // Ambil data auth dan registerAuth
  const location = useLocation(); // Ambil lokasi saat ini
  const [isScrolled, setIsScrolled] = useState(false);

  // Data pengguna
  const user = auth || registerAuth; // Fallback ke registerAuth jika auth kosong

  // Pantau scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0); // Jika scroll lebih dari 0, ubah state
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // Bersihkan listener
  }, []);

  const handleLogout = () => {
    clearAuth(); // Hapus data autentikasi
    window.location.href = "/"; // Arahkan ke halaman utama
  };

  return (
    <div
      className={`sticky top-0 z-30 transition-all duration-300 ${
        isScrolled ? "shadow-lg border-b border-gray-200" : ""
      }`}
    >
      <Navbar fluid rounded className="bg-white">
        <Navbar.Brand href="/">
          <img
            src="/logo2.png" // Sesuaikan dengan logo Anda
            className="md:ml-12 h-6 sm:h-9"
            alt="TripWise Logo"
          />
        </Navbar.Brand>
        <div className="flex md:order-2 md:mr-12">
          {user ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <div className="flex items-center space-x-2 mr-2">
                  <Avatar
                    img={user.file || "/default-user.png"} // Fallback ke gambar default
                    rounded
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Hi, {user.first_name || "Traveler"}
                  </span>
                </div>
              }
            >
              <Dropdown.Header>
                <Link to="/profile" className="block text-sm">
                  Profile
                </Link>
              </Dropdown.Header>
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown>
          ) : (
            <Button color="customBlue">
              <NavLink to="/login" className="text-white">
                Get Started
              </NavLink>
            </Button>
          )}
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse className=" space-y-2 shadow-md mt-2 md:shadow-none md:bg-white md:mt-0">
          {/* Menu Navigasi */}
          {[
            { to: "/home", label: "Home" },
            { to: "/destinasi", label: "Destination" },
            { to: "/rute", label: "Route" },
            { to: "/chatbot", label: "AI Assistant" },
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive && location.pathname === item.to
                  ? "text-sky-600 font-semibold"
                  : "text-gray-600 hover:text-sky-600"
              }
            >
              {item.label}
            </NavLink>
          ))}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavigationBar;
