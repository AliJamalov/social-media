import { BiSolidUserCircle } from "react-icons/bi";
import { HiOutlinePlusSm } from "react-icons/hi";
import { ImSpinner8 } from "react-icons/im";
import { useAuthStore } from "../../store/authStore";
import { useEffect, useRef, useState } from "react";
import { useStoryStore } from "../../store/storyStore";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../utils/axios";

const Stories = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const { user } = useAuthStore();
  const { setMedia, setPrevUrl, fetchStories, fetchMyStory, myStory, stories, fetchLoading } = useStoryStore();

  const [image, setImage] = useState<File | null>(null);
  const [prevImage, setPrevImage] = useState("");
  console.log(image, prevImage);

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

  const handleUpdatedStoryView = async (id: string) => {
    try {
      await axiosInstance.patch(`/stories/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStories();
    fetchMyStory();
  }, []);

  const otherStories = stories?.filter((story) => story.user._id !== user?._id) || [];

  return (
    <section className="px-3 pb-4 flex gap-4 overflow-x-auto">
      {fetchLoading && (
        <div className="flex justify-center absolute right-1/2 top-[80px]">
          <ImSpinner8 className="animate-spin" size={35} />
        </div>
      )}

      {/* My Story */}
      <div
        className="flex flex-col items-center gap-1"
        onClick={
          !myStory
            ? () => inputRef.current?.click()
            : () => {
                navigate(`/stories/${myStory._id}`);
                handleUpdatedStoryView(myStory._id);
              }
        }
      >
        <div
          className={`relative w-14 h-14 rounded-full ${!myStory && "border-none"} ${
            myStory?.viewers.includes(user?._id!) ? "border-2 border-gray-300" : "border-red-500 border-2"
          }`}
        >
          {user?.avatar ? (
            <img src={user.avatar} alt="avatar" className="w-full h-full rounded-full object-cover" />
          ) : (
            <BiSolidUserCircle className="w-full h-full text-gray-400" />
          )}
          {!myStory && !fetchLoading && (
            <div
              className={`${!myStory && "bottom-1 right-1"} absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1`}
            >
              <HiOutlinePlusSm className="text-white text-xs" />
            </div>
          )}
        </div>
        <p className="text-xs truncate max-w-[70px]">{user?.username}</p>
        <input onChange={handleFileChange} ref={inputRef} type="file" accept="image/*" className="hidden" />
      </div>

      {/* Other Stories */}
      {otherStories.map((story) => {
        const isViewed = story.viewers.includes(user?._id!);
        return (
          <div
            key={story._id}
            className="flex flex-col items-center gap-2"
            onClick={() => {
              navigate(`/stories/${story._id}`);
              handleUpdatedStoryView(story._id);
            }}
          >
            <div
              className={`w-14 h-14 rounded-full ${isViewed ? "border-2 border-gray-300" : "border-2 border-red-500"}`}
            >
              {story.user.avatar ? (
                <img
                  src={story.user.avatar}
                  alt={story.user.username}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <BiSolidUserCircle className="w-full h-full text-gray-400" />
              )}
            </div>
            <p className="text-xs truncate max-w-[70px]">{story.user.username}</p>
          </div>
        );
      })}
    </section>
  );
};

export default Stories;
