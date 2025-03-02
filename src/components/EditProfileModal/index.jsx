import { useForm } from "react-hook-form";
import Button from "../Button";
import ErrorMessage from "../ErrorMessage";
import { useUpdateProfile } from "../../hooks/useUpdateProfile";
import Modal from "../Modal";
import { useAuthStore } from "../../store/authStore";
import { toast } from "react-toastify";

/**
 * EditProfileModal displays a modal window with a form that allows users to edit their profile.
 *
 * The form includes fields for updating the bio and avatar URL, and uses react-hook-form
 * for form state management and validation. On form submission, the profile is updated
 * via a mutation, and upon success, the user's profile in the auth store is updated and
 * a success toast is shown.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {boolean} props.isOpen - Controls whether the modal is open.
 * @param {Function} props.onClose - Callback function to close the modal.
 * @param {Object} props.profile - The current user profile.
 * @param {string} props.profile.bio - The current bio of the user.
 * @param {Object} props.profile.avatar - The user's avatar object.
 * @param {string} props.profile.avatar.url - The URL of the user's avatar.
 * @param {string} props.profile.name - The user's name.
 *
 * @returns {JSX.Element} The rendered modal containing the edit profile form.
 */
export default function EditProfileModal({ isOpen, onClose, profile }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      bio: profile.bio,
      avatarUrl: profile.avatar.url,
    },
  });

  const { mutate: updateProfile, isLoading, error } = useUpdateProfile();
  const { setLogin } = useAuthStore();

  /**
   * Handles form submission by updating the user's profile.
   *
   * On a successful update, the auth store is updated with the new profile data,
   * a success toast is shown, and the modal is closed.
   *
   * @param {Object} data - The form data.
   * @param {string} data.bio - The updated bio.
   * @param {string} data.avatarUrl - The updated avatar URL.
   */
  const onSubmit = (data) => {
    updateProfile(
      {
        name: profile.name,
        bio: data.bio,
        avatar: { url: data.avatarUrl, alt: "User avatar" },
      },
      {
        onSuccess: (updatedProfile) => {
          const currentProfile = useAuthStore.getState().userProfile;
          setLogin({
            ...updatedProfile,
            accessToken: currentProfile?.accessToken || "",
          });
          toast.success("Profile updated successfully!", {
            position: "top-center",
          });
          onClose();
        },
      },
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="edit-bio" className="block font-bold">
            Bio
          </label>
          <textarea
            id="edit-bio"
            placeholder="Enter your bio"
            {...register("bio")}
            className="w-full border border-gray-300 p-2 rounded"
          ></textarea>
          {errors.bio && <ErrorMessage message={errors.bio.message} />}
        </div>
        <div>
          <label htmlFor="edit-avatarUrl" className="block font-bold">
            Avatar URL
          </label>
          <input
            id="edit-avatarUrl"
            type="text"
            placeholder="Enter your avatar URL"
            {...register("avatarUrl")}
            className="w-full border border-gray-300 p-2 rounded"
          />
          {errors.avatarUrl && (
            <ErrorMessage message={errors.avatarUrl.message} />
          )}
        </div>
        {error && <ErrorMessage message={error.message} />}
        <div className="flex justify-center mt-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update Profile"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
