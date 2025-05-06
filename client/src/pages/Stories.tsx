import { useParams, useNavigate } from "react-router-dom";
import { useStoryStore } from "../store/storyStore";
import { useEffect, useState, useRef } from "react";
import { Story } from "../types";
import { BiSolidUserCircle } from "react-icons/bi";
import { ImEye } from "react-icons/im";
import { formatTimeAgo } from "../utils/formatTimeAgo";
import { useAuthStore } from "../store/authStore";

const Stories = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { stories } = useStoryStore();
  const { user } = useAuthStore();
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const progressInterval = useRef<number | null>(null);
  const [updatedStories, setUpdatedStories] = useState<Story[]>([]);

  useEffect(() => {
    if (stories && stories.length > 0) {
      const clickedStoryIndex = stories.findIndex((story) => story._id === id);
      if (clickedStoryIndex !== -1) {
        const clickedStory = stories[clickedStoryIndex];
        const restStories = [...stories.slice(0, clickedStoryIndex), ...stories.slice(clickedStoryIndex + 1)];
        setUpdatedStories([clickedStory, ...restStories]);
      } else {
        setUpdatedStories(stories);
      }
    }
  }, [id, stories]);

  useEffect(() => {
    if (updatedStories.length === 0 || isPaused) {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
        progressInterval.current = null;
      }
      return;
    }

    progressInterval.current = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval.current as number);
          goToNextStory();
          return 0;
        }
        return prev + 0.3;
      });
    }, 20);

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [currentStoryIndex, updatedStories.length, isPaused]);

  const goToNextStory = () => {
    setProgress(0);
    if (currentStoryIndex < updatedStories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
    } else {
      navigate(-1);
    }
  };

  const goToPrevStory = () => {
    setProgress(0);
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;

    if (x < width / 3) {
      goToPrevStory();
    } else if (x > (2 * width) / 3) {
      goToNextStory();
    }
  };

  if (updatedStories.length === 0) return;

  const currentStory = updatedStories[currentStoryIndex];

  return (
    <div className="relative h-screen w-full bg-black">
      {/* Единый прогресс бар */}
      <div className="absolute top-0 left-0 right-0 p-2 z-10">
        <div className="h-1 w-full bg-gray-600 rounded-full">
          <div className="h-full bg-white rounded-full" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* История */}
      <div
        className="h-full w-full flex items-center justify-center"
        onClick={handleClick}
        onMouseDown={() => setIsPaused(true)}
        onMouseUp={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        <img src={currentStory.mediaUrl} alt="story" className="h-full w-full object-cover" />
      </div>

      {/* Кнопка закрытия */}
      <button className="absolute top-5 right-4 text-white z-10" onClick={() => navigate(-1)}>
        ✕
      </button>

      {/* Имя пользователя и аватар  */}
      <div className="flex items-center gap-2 absolute top-7 left-4">
        {currentStory.user.avatar ? (
          <img src={currentStory.user.avatar} className="w-[40px] h-[40px] rounded-full object-cover" />
        ) : (
          <BiSolidUserCircle className="text-white w-[40px] h-[40px] rounded-full" />
        )}
        {currentStory.user?.username && <div className="text-white font-semibold">{currentStory.user.username}</div>}
        <p className="text-white font-semibold text-xs">{formatTimeAgo(currentStory.createdAt)}</p>
      </div>
      {currentStory?.user._id === user?._id && (
        <div className="flex items-center gap-4 absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white">
          <ImEye size={25} />
          <p className="font-medium">{currentStory?.viewers?.length}</p>
        </div>
      )}
    </div>
  );
};

export default Stories;
