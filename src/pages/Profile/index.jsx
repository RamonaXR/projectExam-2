import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { useProfile } from "../../hooks/useProfile";
import { useAuthStore } from "../../store/authStore";
import EditProfileModal from "../../components/EditProfileModal";
import BookingsList from "../../components/BookingList";
import VenuesList from "../../components/VenuesList";
import { useManagerVenues } from "../../hooks/useManagerVenues";
import Button from "../../components/Button";
import ErrorMessage from "../../components/ErrorMessage";
import SafeImage from "../../components/SafeImage";
import { Helmet } from "react-helmet-async";
import Loader from "../../components/Loader";

/**
 * Profile component displays the user's profile page.
 *
 * This component retrieves the logged-in user's profile data using the `useProfile` hook,
 * along with any associated bookings and venues. If the user is a Venue Manager,
 * it additionally fetches the venues they manage and displays bookings for those venues.
 * An Edit Profile modal is available for updating profile information.
 * If the user is not logged in, the component redirects to the login page.
 *
 * @component
 * @returns {JSX.Element} The rendered profile page.
 *
 * @example
 * <Profile />
 */
export default function Profile() {
  const { userProfile } = useAuthStore();
  const name = userProfile?.name || "";

  const {
    data: profile,
    isLoading,
    isError,
    error,
  } = useProfile(name, {
    _bookings: true,
    _venues: true,
  });

  const {
    data: managerVenues,
    isLoading: isLoadingManagerVenues,
    isError: isErrorManagerVenues,
    error: errorManagerVenues,
  } = useManagerVenues(name);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  if (!userProfile) {
    return <Navigate to="/login" replace />;
  }

  if (isLoading) {
    return <Loader />;
  }
  if (isError || !profile) {
    return (
      <ErrorMessage message={error ? error.message : "Profile not found"} />
    );
  }

  return (
    <>
      <Helmet>
        <title>
          {profile.name
            ? `${profile.name}'s Profile | Holidaze`
            : "Profile | Holidaze"}
        </title>
        <meta
          name="description"
          content="View and manage your Holidaze profile, bookings, and venues."
        />
      </Helmet>
      <div className="max-w-4xl mx-auto p-4 space-y-8">
        <div className="flex flex-col items-center border border-gray-300 rounded p-4 shadow-md">
          <SafeImage
            src={profile.avatar?.url}
            alt={profile.avatar?.alt || "User avatar"}
            fallback="/img/placeholderavatar.jpg"
            className="w-24 h-24 rounded-full object-cover"
          />
          <h1 className="text-3xl font-bold mt-4 break-all text-center">
            {profile.name}
          </h1>
          <div className="flex justify-center mt-2">
            {profile.venueManager ? (
              <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-xs">
                Venue Manager
              </span>
            ) : (
              <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-xs">
                Traveller
              </span>
            )}
          </div>
          <p className="text-gray-700 mt-2">{profile.bio}</p>
          <Button
            type="button"
            onClick={() => setIsEditModalOpen(true)}
            className="mt-4"
          >
            Edit Profile
          </Button>
        </div>

        {!profile.venueManager ? (
          <>
            <h2 className="text-2xl font-bold">My Bookings</h2>
            <BookingsList bookings={profile.bookings} />
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold">My Venues</h2>
            <VenuesList venues={profile.venues} />
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">
                Bookings on Your Venues
              </h2>
              {isLoadingManagerVenues && (
                <div className="text-center">Loading venue bookings...</div>
              )}
              {isErrorManagerVenues && (
                <ErrorMessage
                  message={
                    errorManagerVenues
                      ? errorManagerVenues.message
                      : "Error fetching venue bookings"
                  }
                />
              )}
              {!isLoadingManagerVenues &&
                !isErrorManagerVenues &&
                managerVenues &&
                (managerVenues.every((venue) => {
                  const upcoming =
                    venue.bookings &&
                    venue.bookings.filter(
                      (b) => new Date(b.dateFrom) >= new Date(),
                    );
                  return !upcoming || upcoming.length === 0;
                }) ? (
                  <p className="text-gray-600">No upcoming bookings.</p>
                ) : (
                  managerVenues.map((venue) => {
                    const upcoming =
                      venue.bookings &&
                      venue.bookings.filter(
                        (b) => new Date(b.dateFrom) >= new Date(),
                      );
                    if (!upcoming || upcoming.length === 0) return null;
                    return (
                      <div key={venue.id} className="mb-4 space-y-4">
                        {upcoming.map((booking) => (
                          <Link
                            to={`/venue/${venue.id}`}
                            key={booking.id}
                            className="block"
                          >
                            <div className="border p-4 rounded shadow flex flex-col md:flex-row md:items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <SafeImage
                                  src={venue.media && venue.media[0]?.url}
                                  fallback="/img/placeholdervenue-3.jpg"
                                  alt={venue.name}
                                  className="w-24 h-24 object-cover rounded"
                                />
                                <div>
                                  <p className="font-bold">{venue.name}</p>
                                  <p>
                                    {new Date(
                                      booking.dateFrom,
                                    ).toLocaleDateString()}{" "}
                                    -{" "}
                                    {new Date(
                                      booking.dateTo,
                                    ).toLocaleDateString()}
                                  </p>
                                  <p>Guests: {booking.guests}</p>
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    );
                  })
                ))}
            </div>
          </>
        )}

        {isEditModalOpen && (
          <EditProfileModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            profile={profile}
          />
        )}
      </div>
    </>
  );
}
