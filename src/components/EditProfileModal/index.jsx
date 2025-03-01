import { useForm } from "react-hook-form";
import Button from "../Button";
import ErrorMessage from "../ErrorMessage";
import { useUpdateProfile } from "../../hooks/useUpdateProfile";
import Modal from "../Modal";
import { useAuthStore } from "../../store/authStore";
import { toast } from "react-toastify";

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
