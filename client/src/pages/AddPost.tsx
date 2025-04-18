import React, { useState } from "react";
import { axiosInstance } from "../utils/axios";
import { FiUpload } from "react-icons/fi";
import { uploadSingleImage } from "../utils/cloudinary";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { PiSpinner } from "react-icons/pi";

const AddPost = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState<File | null>(null);
  const [prevImage, setPrevImage] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [taggedUsers, setTaggedUsers] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImage(file);
        setPrevImage(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    if (!image) {
      toast.error("Please upload an image.");
      return;
    }
    e.preventDefault();
    setLoading(true);

    const uploadedImageUrl = await uploadSingleImage(image);
    const tagsArray = tags
      .split("#")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");

    const taggedUsersArray = taggedUsers
      .split("@")
      .map((user) => user.trim())
      .filter((user) => user !== "");

    try {
      if (uploadedImageUrl) {
        await axiosInstance.post("/posts", {
          image: uploadedImageUrl,
          description,
          tags: tagsArray,
          taggedUsers: taggedUsersArray,
        });
        toast.success("Post created successfully!");
        navigate("/profile");
      } else {
        toast.error("Image upload failed");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center text-white">
      <h1 className="text-white font-semibold text-2xl my-4">New Post</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md p-6 rounded-lg">
        {/* Image Upload */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Image</label>
          <div className="flex items-center gap-2">
            <label
              htmlFor="imageUpload"
              className="cursor-pointer text-white border border-white p-2 rounded flex items-center gap-2"
            >
              <FiUpload />
              Upload Image
            </label>
            <input onChange={handleImageChange} type="file" id="imageUpload" accept="image/*" className="hidden" />
          </div>
        </div>

        {/* Preview Image */}
        {prevImage && (
          <div className="mb-4">
            <img src={prevImage} alt="preview" className="w-full h-48 object-cover rounded-md" />
          </div>
        )}

        {/* Description */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 rounded bg-white text-gray-500 resize-none"
            rows={4}
            placeholder="Write something..."
          />
        </div>

        {/* Tags */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Tags</label>
          <input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            type="text"
            className="w-full p-2 rounded bg-white text-gray-500"
            placeholder="#tag1 #tag2"
          />
        </div>

        {/* Tagged Users */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Tag Users</label>
          <input
            value={taggedUsers}
            onChange={(e) => setTaggedUsers(e.target.value)}
            type="text"
            className="w-full p-2 rounded bg-white text-gray-500"
            placeholder="@username1 @username2"
          />
        </div>

        {/* Submit Button */}
        <button
          disabled={loading}
          type="submit"
          className="w-full flex justify-center bg-[#ffeaa7] text-orange-500 py-2 px-4 rounded font-semibold"
        >
          {loading ? <PiSpinner size={20} className="animate-spin" /> : "Post"}
        </button>
      </form>
    </div>
  );
};

export default AddPost;
