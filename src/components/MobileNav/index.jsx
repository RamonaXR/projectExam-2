import { NavLink } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { FiX } from "react-icons/fi";

export default function MobileNav({ toggleMenu }) {
  const { isLoggedIn, userProfile } = useAuthStore();
  const buttonStyle =
    "bg-button text-white py-2 px-4 rounded-md text-xl w-full text-center";

  return (
    <div className="md:hidden fixed inset-0 bg-white z-50 flex flex-col items-center justify-center animate-fadeIn space-y-6 px-4">
      <button
        onClick={toggleMenu}
        aria-label="Close Menu"
        className="absolute top-4 right-4 text-2xl text-gray-700 focus:outline-none"
      >
        <FiX />
      </button>
      {!isLoggedIn && (
        <>
          <NavLink onClick={toggleMenu} to="/login" className={buttonStyle}>
            Log in
          </NavLink>
          <NavLink onClick={toggleMenu} to="/register" className={buttonStyle}>
            Register
          </NavLink>
        </>
      )}
      {isLoggedIn && (
        <>
          <NavLink onClick={toggleMenu} to="/profile" className={buttonStyle}>
            {userProfile?.name || "My Profile"}
          </NavLink>
          {userProfile?.venueManager ? (
            <>
              <NavLink
                onClick={toggleMenu}
                to="/add-venue"
                className={buttonStyle}
              >
                Add new venue
              </NavLink>
              <NavLink
                onClick={toggleMenu}
                to="/my-venues"
                className={buttonStyle}
              >
                My venues
              </NavLink>
            </>
          ) : (
            <NavLink
              onClick={toggleMenu}
              to="/my-bookings"
              className={buttonStyle}
            >
              My bookings
            </NavLink>
          )}
        </>
      )}
      <NavLink onClick={toggleMenu} to="/contact" className={buttonStyle}>
        Contact
      </NavLink>
    </div>
  );
}
