import { Navbar, Button } from "flowbite-react";
import { Link } from "react-router-dom";
import useAuthStore from "../../store/authStore";

const NavigationBar = () => {
  const { user, clearAuth } = useAuthStore(); // Ambil data user dan fungsi logout

  const handleLogout = () => {
    clearAuth(); // Hapus data autentikasi
    window.location.href = "/"; // Arahkan ke halaman utama
  };

  return (
    <Navbar fluid rounded className="container sticky top-0 z-30">
      <Navbar.Brand href="/">
        <img
          src="/logo2.png" // Sesuaikan dengan logo Anda
          className="h-6 sm:h-9"
          alt="TripWise Logo"
        />
      </Navbar.Brand>
      <div className="flex justify-center items-center space-x-4 md:order-2">
        {user ? (
          // Jika user login, tampilkan nama pengguna dan tombol logout
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">
              Hi, {user.first_name|| "Traveler"}
            </span>
            <Button color="failure" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        ) : (
          // Jika user belum login, tampilkan tombol login
          <Button color="customBlue">
            <Link to="/login">Get Started</Link>
          </Button>
        )}
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="/">Home</Navbar.Link>
        <Navbar.Link href="/features">Destination</Navbar.Link>
        <Navbar.Link href="/about">Route</Navbar.Link>
        <Navbar.Link href="/contact">AI Assistant</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
