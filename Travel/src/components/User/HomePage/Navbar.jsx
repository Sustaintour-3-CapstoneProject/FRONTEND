import { Navbar, Button, Dropdown, Avatar } from "flowbite-react";
import { NavLink, useLocation } from "react-router-dom";
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
      <Navbar fluid rounded className="shadow-lg">
        <Navbar.Brand href="/">
          <img
            src="/logo2.png" // Sesuaikan dengan logo Anda
            className="md:ml-12 h-6 sm:h-9"
            alt="TripWise Logo"
          />
        </Navbar.Brand>
        <div className="flex md:order-2 md:mr-12">
          {auth ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <div className="flex items-center space-x-2 mr-2">
                  <Avatar
                    img={auth.profileImage || "/default-user.png"} // Fallback ke gambar default jika auth.profileImage kosong
                    rounded
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Hi, {auth.first_name || "Traveler"}
                  </span>
                </div>
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">
                  {auth.first_name} {auth.last_name || ""}
                </span>
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
        <Navbar.Collapse>
          {/* Menu Navigasi */}
          {[
            { to: "/home", label: "Home" },
            { to: "/destinasi", label: "Destination" },
            { to: "/about", label: "About" },
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
