import { Navbar, Button } from "flowbite-react";
import { Link } from "react-router-dom";

const NavigationBar = () => (
  <Navbar fluid rounded className="sticky top-0 z-10">
    <Navbar.Brand href="/">
      <img
        src="/logo2.png" // Sesuaikan dengan logo Anda
        className="h-6 sm:h-9"
        alt="TripWise Logo"
      />
    </Navbar.Brand>
    <div className="flex justify-center items-center space-x-3 md:order-2">
      <Link to="/login">Login in</Link>
      <Button>
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
