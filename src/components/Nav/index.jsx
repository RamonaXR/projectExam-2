import { NavLink } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

/**
 * Nav component renders the primary navigation menu for the application.
 *
 * It displays different navigation options based on the user's authentication status and role.
 * - If the user is logged in and is a venue manager, links for "Add new venue" and "My venues" are shown.
 * - If the user is logged in but not a venue manager, a link for "My bookings" is displayed.
 * - The "Contact" link is always displayed.
 *
 * @component
 * @returns {JSX.Element} The rendered navigation menu.
 */
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
