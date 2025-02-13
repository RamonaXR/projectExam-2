import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { useAuthStore } from "../../store/authStore";
import { Link } from "react-router-dom";
import MobileNav from "../MobileNav";
import Nav from "../Nav";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, userProfile } = useAuthStore();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="relative bg-white shadow-md">
      <div className="flex items-center justify-between p-4">
        {/* Logo */}
        <Link to="/">
          <img
            src="/logoholidaze.svg"
            alt="Holidaze Logo"
            className="h-8 w-auto"
          />
        </Link>
        {/* Desktop Navigation & Auth*/}
        <div className="hidden md:flex items-center space-x-6">
          <Nav />
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <Link
                to="/profile"
                className="bg-button text-white py-2 px-4 rounded-md"
              >
                {userProfile?.name || "My Profile"}
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-button text-white py-2 px-4 rounded-md"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="bg-button text-white py-2 px-4 rounded-md"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
        {/* Mobile Hamburger */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-2xl text-gray-700 focus:outline-none"
          aria-label="Toggle Menu"
        >
          <FiMenu />
        </button>
      </div>
      {/* Mobile Menu Overlay */}
      {isMenuOpen && <MobileNav toggleMenu={toggleMenu} />}
    </header>
  );
}
