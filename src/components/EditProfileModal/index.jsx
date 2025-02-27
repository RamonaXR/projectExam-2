import { useForm } from "react-hook-form";
import Button from "../Button";
import ErrorMessage from "../ErrorMessage";
import { useUpdateProfile } from "../../hooks/useUpdateProfile";
import Modal from "../Modal";

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

  const onSubmit = (data) => {
    updateProfile(
      {
        name: profile.name,
        bio: data.bio,
        avatar: { url: data.avatarUrl, alt: "User avatar" },
      },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Profile">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-bold">Bio</label>
          <textarea
            {...register("bio")}
            className="w-full border border-gray-300 p-2 rounded"
          ></textarea>
          {errors.bio && <ErrorMessage message={errors.bio.message} />}
        </div>
        <div>
          <label className="block font-bold">Avatar URL</label>
          <input
            type="text"
            {...register("avatarUrl")}
            className="w-full border border-gray-300 p-2 rounded"
          />
          {errors.avatarUrl && (
            <ErrorMessage message={errors.avatarUrl.message} />
          )}
        </div>
        {error && <ErrorMessage message={error.message} />}
        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update Profile"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
