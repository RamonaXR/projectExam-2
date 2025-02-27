import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../../hooks/useProfile";
import { useAuthStore } from "../../store/authStore";
import EditProfileModal from "../../components/EditProfileModal";
import BookingsList from "../../components/BookingList";
import VenuesList from "../../components/VenuesList";
import Button from "../../components/Button";
import ErrorMessage from "../../components/ErrorMessage";
import SafeImage from "../../components/SafeImage";

export default function Profile() {
  const { userProfile } = useAuthStore();
  const navigate = useNavigate();
  const {
    data: profile,
    isLoading,
    isError,
    error,
    refetch,
  } = useProfile(userProfile?.name, { _bookings: true, _venues: true });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Redirect to login if not logged in
  useEffect(() => {
    if (!userProfile) {
      navigate("/login");
    }
  }, [userProfile, navigate]);

  if (isLoading) return <div className="text-center">Loading profile...</div>;
  if (isError) return <ErrorMessage message={error.message} />;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex flex-col items-center border border-gray-300 rounded p-4 shadow-md mb-8">
        <SafeImage
          src={profile.avatar.url}
          alt={profile.avatar.alt || "User avatar"}
          fallback="/img/placeholderavatar.jpg"
          className="w-24 h-24 rounded-full object-cover"
        />
        <h1 className="text-3xl font-bold mt-4">{profile.name}</h1>
        <p className="text-gray-700 mt-2">{profile.bio}</p>
        <Button
          type="button"
          onClick={() => setIsEditModalOpen(true)}
          className="mt-4"
        >
          Edit Profile
        </Button>
      </div>

      {profile.venueManager ? (
        <>
          <h2 className="text-2xl font-bold mb-4">Your Venues</h2>
          <VenuesList venues={profile.venues} />
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4">Your Bookings</h2>
          <BookingsList bookings={profile.bookings} />
        </>
      )}

      {isEditModalOpen && (
        <EditProfileModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            refetch();
          }}
          profile={profile}
        />
      )}
    </div>
  );
}
