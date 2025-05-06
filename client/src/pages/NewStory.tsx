import { useState } from "react";
import { useStoryStore } from "../store/storyStore";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { ImSpinner8 } from "react-icons/im";
import { uploadSingleImage } from "../utils/cloudinary";

const NewStory = () => {
  const navigate = useNavigate();
  const { image, prevImage, addLoading, addStory } = useStoryStore();

  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateStory = async () => {
    setLoading(true);
    const mediaUrl = await uploadSingleImage(image!);
    setLoading(false);

    if (mediaUrl) {
      const success = await addStory(text, mediaUrl!);
      if (success) navigate("/");
    }
  };

  return (
    <div className="h-[80vh] relative pb-[30px]">
      <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xl font-bold">
        {text}
      </p>
      {prevImage && <img src={prevImage} alt="story-media" className="h-full w-full object-cover" />}
      <div className="px-3 mt-4 flex items-center gap-3">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="text"
          placeholder="text..."
          className="w-full border border-white p-2 rounded-md outline-none text-white placeholder-white"
        />
        <button
          disabled={addLoading}
          onClick={handleCreateStory}
          className="w-11 h-11 bg-white rounded-full flex justify-center items-center"
        >
          {loading || addLoading ? (
            <ImSpinner8 className="animate-spin text-blue-500" />
          ) : (
            <IoIosArrowForward size={20} color="blue" />
          )}
        </button>
      </div>
    </div>
  );
};

export default NewStory;
