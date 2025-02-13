import { NavLink } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

export default function Nav() {
  const { isLoggedIn, userProfile } = useAuthStore();

  return (
    <nav className="flex space-x-6">
      {isLoggedIn && userProfile?.venueManager ? (
        <>
          <NavLink
            to="/add-venue"
            className={({ isActive }) =>
              isActive ? "font-bold text-gray-900" : "font-bold text-gray-700"
            }
          >
            Add new venue
          </NavLink>
          <NavLink
            to="/my-venues"
            className={({ isActive }) =>
              isActive ? "font-bold text-gray-900" : "font-bold text-gray-700"
            }
          >
            My venues
          </NavLink>
        </>
      ) : isLoggedIn ? (
        <NavLink
          to="/my-bookings"
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
