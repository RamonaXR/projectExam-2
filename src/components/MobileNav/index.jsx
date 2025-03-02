import { NavLink } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { FiX } from "react-icons/fi";
import Button from "../Button";

/**
 * MobileNav renders a full-screen mobile navigation menu overlay.
 *
 * This component displays a backdrop with a background image and a semi-transparent overlay.
 * It shows the user's profile information if logged in, including an avatar and name,
 * and provides navigation links based on the user's role (venue manager or customer).
 * It also includes a logout button for authenticated users, or a login button if not authenticated.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Function} props.toggleMenu - Function to toggle the visibility of the mobile menu.
 * @returns {JSX.Element} The rendered mobile navigation menu overlay.
 */
export default function MobileNav({ toggleMenu }) {
  const { isLoggedIn, userProfile, setLogout } = useAuthStore();
  const isVenueManager =
    String(userProfile?.venueManager).toLowerCase() === "true";

  const navLinkStyle = "font-bold text-2xl text-gray-100 text-center";
  const buttonStyle = "bg-button text-white py-3 px-6 rounded-md text-2xl";

  return (
    <div
      className="md:hidden bg-black fixed inset-0 z-50 flex flex-col items-center justify-center p-8 backdrop-blur-lg"
      style={{
        backgroundImage: 'url("/img/waves.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-70"></div>

      <button
        onClick={toggleMenu}
        aria-label="Close Menu"
        className="absolute top-4 right-4 text-3xl text-gray-100 focus:outline-none"
      >
        <FiX />
      </button>

      <div className="relative z-10 w-full flex flex-col items-center">
        <div className="w-full flex flex-col items-center mt-4">
          {isLoggedIn ? (
            <>
              <NavLink
                onClick={toggleMenu}
                to="/profile"
                className="flex flex-col items-center"
              >
                <img
                  src={
                    userProfile?.avatar?.url || "/img/placeholder-avatar.jpg"
                  }
                  alt={userProfile?.avatar?.alt || "User avatar"}
                  className="w-28 h-28 rounded-full shadow-xl mb-3 object-cover"
                />
                <span className="font-bold text-3xl text-gray-100">
                  {userProfile?.name}
                </span>
              </NavLink>
              <Button
                onClick={() => {
                  setLogout();
                  toggleMenu();
                }}
                className={`${buttonStyle} mt-4`}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              as={NavLink}
              to="/login"
              onClick={toggleMenu}
              className={buttonStyle}
            >
              Log in
            </Button>
          )}
        </div>

        <div className="w-full flex flex-col items-center mt-12 space-y-4">
          {isLoggedIn ? (
            isVenueManager ? (
              <>
                <NavLink
                  onClick={toggleMenu}
                  to="/venue/add"
                  className={navLinkStyle}
                >
                  Add new venue
                </NavLink>
                <NavLink
                  onClick={toggleMenu}
                  to="/profile"
                  className={navLinkStyle}
                >
                  My venues
                </NavLink>
              </>
            ) : (
              <NavLink
                onClick={toggleMenu}
                to="/profile"
                className={navLinkStyle}
              >
                My bookings
              </NavLink>
            )
          ) : null}
          <NavLink onClick={toggleMenu} to="/contact" className={navLinkStyle}>
            Contact
          </NavLink>
        </div>
      </div>
    </div>
  );
}
