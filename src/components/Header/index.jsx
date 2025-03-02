import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { useAuthStore } from "../../store/authStore";
import { Link } from "react-router-dom";
import MobileNav from "../MobileNav";
import Nav from "../Nav";
import Button from "../Button";

/**
 * Header component renders the top navigation bar of the application.
 *
 * It displays the site logo, navigation links, and user authentication actions.
 * Depending on the user's login status, it shows either the profile link with a logout button
 * or a login button. It also includes a mobile menu toggle that reveals the MobileNav component on smaller screens.
 *
 * @component
 * @returns {JSX.Element} The rendered header component.
 */
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, userProfile, setLogout } = useAuthStore();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white shadow-md" role="banner">
      <div className="container mx-auto p-4 md:py-8 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link to="/" aria-label="Home">
            <img
              src="/logoholidaze.svg"
              alt="Holidaze Logo"
              className="h-8 w-auto"
            />
          </Link>
          {isLoggedIn && (
            <div className="hidden md:block">
              <Nav />
            </div>
          )}
        </div>

        <div className="hidden md:flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <Link to="/profile" className="flex items-center gap-2">
                <img
                  src={
                    userProfile?.avatar?.url || "/img/placeholder-avatar.jpg"
                  }
                  alt={userProfile?.avatar?.alt || "User avatar"}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="font-bold text-gray-700">
                  {userProfile?.name}
                </span>
              </Link>
              <Button onClick={setLogout} className="px-3 py-1 text-sm">
                Logout
              </Button>
            </>
          ) : (
            <Button as={Link} to="/login">
              Log in
            </Button>
          )}
        </div>

        <button
          onClick={toggleMenu}
          className="md:hidden text-2xl text-gray-700 focus:outline-none"
          aria-label="Toggle menu"
        >
          <FiMenu />
        </button>
      </div>

      {isMenuOpen && <MobileNav toggleMenu={toggleMenu} />}
    </header>
  );
}
