import React, { useRef, useState } from "react";
import { useAuthStore } from "../../store/authStore";
import toast from "react-hot-toast";
import { axiosInstance } from "../../utils/axios";
import { CgProfile } from "react-icons/cg";
import { MdEdit } from "react-icons/md";
import { uploadSingleImage } from "../../utils/cloudinary";

type Props = {
  toggleModal: () => void;
};

const EditProfile = ({ toggleModal }: Props) => {
  const { user, setUser } = useAuthStore();

  const inputRef = useRef<HTMLInputElement>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(user?.avatar || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [isPrivate, setIsPrivate] = useState(user?.isPrivate || false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let imageUrl: string | null = "";

    try {
      if (avatarFile) {
        imageUrl = await uploadSingleImage(avatarFile);
      }

      const response = await axiosInstance.patch("/users", {
        avatar: imageUrl,
        bio,
        isPrivate,
      });
      toggleModal();
      setUser(response.data.user);
      toast.success("Profile updated!");
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="fixed inset-0 px-4 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Avatar Upload with Preview */}
          <div className="flex flex-col items-center gap-2">
            <label className="text-gray-700 font-medium mb-1">Upload Avatar</label>
            <div className="relative w-[80px] h-[80px] rounded-full overflow-hidden border border-gray-300">
              {preview ? (
                <img src={preview} alt="avatar-preview" className="w-full h-full object-cover" />
              ) : (
                <CgProfile size={80} className="text-gray-400" />
              )}
              <input ref={inputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </div>
            <div className="relative">
              <MdEdit
                onClick={() => inputRef?.current?.click()}
                className="absolute top-[-17px] text-black left-[20px]"
                size={25}
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-gray-700 font-medium mb-1 mt-4">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us something about you..."
              className="w-full p-2 border border-black text-black rounded-md h-24 resize-none focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          {/* Private Account */}
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={isPrivate}
              onChange={(e) => setIsPrivate(e.target.checked)}
              className="mr-2"
            />
            <label className="text-gray-700">Make account private</label>
          </div>

          {/* Submit Button */}
          <div className="flex justify-between gap-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md transition duration-200 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={toggleModal}
              className="w-full bg-black text-white font-semibold py-2 px-4 rounded-md transition duration-200 disabled:opacity-50"
            >
              close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
