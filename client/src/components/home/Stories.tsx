import { BiSolidUserCircle } from "react-icons/bi";
import { HiOutlinePlusSm } from "react-icons/hi";
import { useAuthStore } from "../../store/authStore";
import { useEffect, useRef, useState } from "react";
import { useStoryStore } from "../../store/storyStore";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../utils/axios";
import { Story } from "../../types";

const Stories = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const { user } = useAuthStore();
  const { setMedia, setPrevUrl } = useStoryStore();

  const [image, setImage] = useState<File | null>(null);
  const [prevImage, setPrevImage] = useState("");
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [isViewedStories, setIsViewedStories] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPrevImage(URL.createObjectURL(file));
      setMedia(file);
      setPrevUrl(URL.createObjectURL(file));
      navigate("/new-story");
    }
  };

  const fetchStories = async () => {
    try {
      const response = await axiosInstance.get("/stories");
      setStories(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  useEffect(() => {
    if (stories.length > 0 && user?._id) {
      const hasViewed = stories.some((story) => story.viewers.includes(user._id));
      setIsViewedStories(hasViewed);
    }
  }, [stories, user]);

  return (
    <section className="px-3 pb-6">
      {/* My story */}
      <div onClick={() => inputRef?.current?.click()} className="relative w-[70px] z-10">
        {user?.avatar ? (
          <img src={user?.avatar} alt="avatar" />
        ) : (
          <BiSolidUserCircle
            size={70}
            className={`${isViewedStories ? "border-gray-400" : "border-fuchsia-700"} border-5 rounded-full`}
          />
        )}
        <button className="bg-blue-500 rounded-full w-6 h-6 absolute right-1 bottom-0 flex justify-center items-center">
          <HiOutlinePlusSm />
        </button>
        <input onChange={handleFileChange} ref={inputRef} type="file" accept="image/*" className="hidden" />
      </div>
      {/* Users stories */}
      <div></div>
    </section>
  );
};

export default Stories;
