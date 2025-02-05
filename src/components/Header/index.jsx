import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { useAuthStore } from "../../store/authStore";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, userProfile } = useAuthStore(); // Access Zustand store

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md">
      {/* Logo */}
      <div className="flex items-center">
        <img
          src="/logoholidaze.svg"
          alt="Holidaze Logo"
          className="h-8 w-auto mr-4"
        />
        <nav className="hidden md:flex space-x-6">
          {/* Desktop Navigation Links */}
          {isLoggedIn && userProfile?.venueManager && (
            <>
              <a
                href="/add-venue"
                className="text-sm text-gray-700 hover:underline"
              >
                Add new venue
              </a>
              <a
                href="/my-venues"
                className="text-sm text-gray-700 hover:underline"
              >
                My venues
              </a>
            </>
          )}
          {isLoggedIn && !userProfile?.venueManager && (
            <a
              href="/my-bookings"
              className="text-sm text-gray-700 hover:underline"
            >
              My bookings
            </a>
          )}
        </nav>
      </div>

      {/* Desktop Buttons */}
      <div className="hidden md:flex space-x-4">
        {isLoggedIn ? (
          <a
            href="/profile"
            className="bg-button text-white py-2 px-4 rounded-md hover:bg-red-500 transition flex items-center justify-center text-center"
          >
            {userProfile?.name || "My profile"}
          </a>
        ) : (
          <a
            href="/login"
            className="bg-button text-white py-2 px-4 rounded-md hover:bg-red-500 transition flex items-center justify-center text-center"
          >
            Log in
          </a>
        )}
      </div>

      {/* Mobile Hamburger Menu */}
      <button
        onClick={toggleMenu}
        className="md:hidden text-2xl text-gray-700"
        aria-label="Toggle Menu"
      >
        {isMenuOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-0 left-0 w-full h-screen bg-white z-10 flex flex-col p-6 shadow-md">
          <button
            onClick={toggleMenu}
            className="text-2xl text-gray-700 self-end mb-4"
            aria-label="Close Menu"
          >
            <FiX />
          </button>

          <nav className="flex flex-col space-y-4 self-end items-end">
            {!isLoggedIn && (
              <>
                <a
                  href="/login"
                  className="bg-button text-white py-2 px-4 rounded-md hover:bg-red-500 transition flex items-center justify-center text-center w-full sm:w-auto"
                >
                  Log in
                </a>
                <a
                  href="/register"
                  className="bg-button text-white py-2 px-4 rounded-md hover:bg-red-500 transition flex items-center justify-center text-center w-full sm:w-auto"
                >
                  Register
                </a>
              </>
            )}
            {isLoggedIn && (
              <>
                <a
                  href="/profile"
                  className="bg-button text-white py-2 px-4 rounded-md hover:bg-red-500 transition flex items-center justify-center text-center w-full sm:w-auto"
                >
                  {userProfile?.name || "My profile"}
                </a>
                {userProfile?.venueManager && (
                  <>
                    <a
                      href="/add-venue"
                      className="text-gray-700 hover:underline text-right"
                    >
                      Add new venue
                    </a>
                    <a
                      href="/my-venues"
                      className="text-gray-700 hover:underline text-right"
                    >
                      My venues
                    </a>
                  </>
                )}
                {!userProfile?.venueManager && (
                  <a
                    href="/my-bookings"
                    className="text-gray-700 hover:underline text-right"
                  >
                    My bookings
                  </a>
                )}
              </>
            )}
            <a
              href="/contact"
              className="bg-button text-white py-2 px-4 rounded-md hover:bg-red-500 transition flex items-center justify-center text-center w-full sm:w-auto"
            >
              Contact
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
