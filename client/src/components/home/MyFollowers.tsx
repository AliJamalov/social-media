import { useEffect, useState } from "react";
import { axiosInstance } from "../../utils/axios";
import { BiSolidUserCircle } from "react-icons/bi";
import { RiCloseLargeFill } from "react-icons/ri";
import { ImSpinner8 } from "react-icons/im";
import { User } from "../../types";

type Props = {
  setIsShowMyFollowers: (value: boolean) => void;
  postId: string | null;
};

const MyFollowers = ({ setIsShowMyFollowers, postId }: Props) => {
  const [followers, setFollowers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [postLoading, setPostLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchMyFollowers = async () => {
      try {
        const response = await axiosInstance.get("/users/my-followings");
        setFollowers(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMyFollowers();
  }, []);

  const handleSentMedia = async () => {
    if (!userId || !postId) return console.log("postId:", postId, "userId:", userId);
    setPostLoading(true);

    try {
      const response = await axiosInstance.post(`/chats/${userId}`, { media: postId });
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setPostLoading(false);
    }
  };

  if (loading) {
    return <p className="p-4">Loading followers...</p>;
  }

  return (
    <section className="z-50 fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white w-[90%] max-w-md rounded-lg flex flex-col overflow-hidden shadow-lg p-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semiboldt text-black">Followers</h2>
          <RiCloseLargeFill onClick={() => setIsShowMyFollowers(false)} size={20} color="black" />
        </div>
        {followers.length === 0 ? (
          <p className="text-center">No followers yet.</p>
        ) : (
          <div className="grid grid-cols-3 gap-4 overflow-y-auto">
            {followers.map((follower) => (
              <div
                onClick={() => setUserId(follower._id)}
                key={follower._id}
                className={`${
                  userId && userId === follower._id ? "border border-blue-500" : ""
                } flex flex-col items-center text-center bg-gray-100 p-2 rounded-md`}
              >
                {follower.avatar ? (
                  <img src={follower.avatar} alt="avatar" className="w-12 h-12 rounded-full object-cover" />
                ) : (
                  <BiSolidUserCircle className="w-12 h-12 text-gray-400" />
                )}
                <p className="text-sm font-medium text-black truncate w-full">{follower.username}</p>
              </div>
            ))}
          </div>
        )}
        <button
          onClick={handleSentMedia}
          disabled={postLoading}
          className={`${!userId ? "bg-blue-300" : "bg-blue-500"} rounded-md mt-3 py-2 flex justify-center`}
        >
          {postLoading ? <ImSpinner8 className="animate-spin" size={20} /> : "Sent"}
        </button>
      </div>
    </section>
  );
};

export default MyFollowers;
