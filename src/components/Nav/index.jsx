import { NavLink } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

export default function Nav() {
  const { isLoggedIn, userProfile } = useAuthStore();
  const isVenueManager =
    String(userProfile?.venueManager).toLowerCase() === "true";

  return (
    <nav className="flex space-x-6" aria-label="Primary navigation">
      {isLoggedIn && isVenueManager ? (
        <>
          <NavLink
            to="/venue/add"
            className={({ isActive }) =>
              isActive ? "font-bold text-gray-900" : "font-bold text-gray-700"
            }
          >
            Add new venue
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? "font-bold text-gray-900" : "font-bold text-gray-700"
            }
          >
            My venues
          </NavLink>
        </>
      ) : isLoggedIn ? (
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? "font-bold text-gray-900" : "font-bold text-gray-700"
          }
        >
          My bookings
        </NavLink>
      ) : null}
      <NavLink
        to="/contact"
        className={({ isActive }) =>
          isActive ? "font-bold text-gray-900" : "font-bold text-gray-700"
        }
      >
        Contact
      </NavLink>
    </nav>
  );
}
