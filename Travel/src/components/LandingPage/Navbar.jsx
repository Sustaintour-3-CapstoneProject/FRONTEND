import React, { useState } from "react";
import { Navbar, Button } from "flowbite-react";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  // State untuk melacak menu aktif
  const [activeMenu, setActiveMenu] = useState("Home");

  // Fungsi untuk menangani klik menu
  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  return (
    <Navbar fluid rounded className="sticky top-0 z-30 bg-white">
      {/* Logo */}
      <Navbar.Brand href="/">
        <img
          src="/logo2.png" // Sesuaikan dengan logo Anda
          className="md:ml-14 h-6 sm:h-9"
          alt="TripWise Logo"
        />
      </Navbar.Brand>

      {/* Login dan Button Get Started */}
      <div className="flex items-center space-x-2 md:order-2 md:mr-16 ">
        <Link
          to="/login"
          className="text-sm text-gray-600 hover:underline hidden sm:block"
        >
          Login
        </Link>
        <Button color="customBlue">
          <Link to="/login" className="text-white">
            Get Started
          </Link>
        </Button>

        {/* Hamburger Menu */}
        <Navbar.Toggle />
      </div>

      {/* Menu Navigasi */}
      <Navbar.Collapse>
        <Navbar.Link
          href="/"
          className={activeMenu === "Home" ? "text-sky-600 font-bold" : ""}
          onClick={() => handleMenuClick("Home")}
        >
          Home
        </Navbar.Link>
        <Navbar.Link
          href="#features"
          className={activeMenu === "Features" ? "text-sky-600 font-bold" : ""}
          onClick={() => handleMenuClick("Features")}
        >
          Features
        </Navbar.Link>
        <Navbar.Link
          href="#about"
          className={activeMenu === "About Us" ? "text-sky-600 font-bold" : ""}
          onClick={() => handleMenuClick("About Us")}
        >
          About Us
        </Navbar.Link>
        <Navbar.Link
          href="#contact"
          className={activeMenu === "Contact" ? "text-sky-600 font-bold" : ""}
          onClick={() => handleMenuClick("Contact")}
        >
          Contact
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
