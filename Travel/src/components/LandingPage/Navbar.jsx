import { Navbar, Button } from "flowbite-react";
import { Link } from "react-router-dom";

const NavigationBar = () => (
  <Navbar fluid rounded className="container sticky top-0 z-30">
    <Navbar.Brand href="/">
      <img
        src="/logo2.png" // Sesuaikan dengan logo Anda
        className="h-6 sm:h-9"
        alt="TripWise Logo"
      />
    </Navbar.Brand>
    <div className="flex justify-center items-center space-x-4 md:order-2">
      <Link to="/login" className="hover:underline">
        Login
      </Link>
      <Button color="customBlue">
        <Link to="/login">Get Started</Link>
      </Button>
    </div>
    <Navbar.Collapse>
      <Navbar.Link href="/">Home</Navbar.Link>
      <Navbar.Link href="/features">Features</Navbar.Link>
      <Navbar.Link href="/about">About Us</Navbar.Link>
      <Navbar.Link href="/contact">Contact</Navbar.Link>
    </Navbar.Collapse>
  </Navbar>
);

export default NavigationBar;
