import { Navbar, Button } from "flowbite-react";
import { NavLink, useLocation } from "react-router-dom"; // Gunakan NavLink & useLocation
import useAuthStore from "../../../store/authStore";

const NavigationBar = () => {
  const { auth, clearAuth } = useAuthStore(); // Ambil data autentikasi dan fungsi logout
  const location = useLocation(); // Ambil lokasi saat ini

  const handleLogout = () => {
    clearAuth(); // Hapus data autentikasi
    window.location.href = "/"; // Arahkan ke halaman utama
  };

  return (
    <div className="sticky top-0 z-30">
      <Navbar fluid rounded className=" shadow-lg">
        <Navbar.Brand href="/">
          <img
            src="/logo2.png" // Sesuaikan dengan logo Anda
            className="h-6 sm:h-9"
            alt="TripWise Logo"
          />
        </Navbar.Brand>
        <div className="flex md:order-2">
          {auth ? (
            <div className="hidden md:flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">
                Hi, {auth.first_name || "Traveler"}
              </span>
              <Button color="failure" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <Button color="customBlue">
              <NavLink to="/login" className="text-white">
                Get Started
              </NavLink>
            </Button>
          )}
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          {/* Menu Navigasi */}
          {[
            { to: "/home", label: "Home" },
            { to: "/home/destinasi", label: "Destination" },
            { to: "/about", label: "About" },
            { to: "/contact", label: "AI Assistant" },
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive && location.pathname === item.to
                  ? "text-blue-600 font-semibold"
                  : "text-gray-600 hover:text-blue-600"
              }
            >
              {item.label}
            </NavLink>
          ))}
          {auth && (
            <div className="mt-3 md:hidden">
              <span className="block text-sm font-medium text-gray-700 mb-2">
                Hi, {auth?.first_name || "Traveler"}
              </span>
              <Button
                color="failure"
                onClick={handleLogout}
                className="w-full text-center"
              >
                Logout
              </Button>
            </div>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavigationBar;
