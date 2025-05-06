import { useAuthStore } from "../../store/authStore";
import { BiSolidUserCircle } from "react-icons/bi";
import { MdLogout } from "react-icons/md";
import { User } from "../../types";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../utils/axios";
import { useNavigate } from "react-router-dom";

type Props = {
  postsCount: number;
  toggleModal: () => void;
  isOtherUser: boolean;
  profileInfo: User | null;
  otherUserPostsCount: number | null | undefined;
  isPrivate: boolean | undefined;
  id?: string | null;
};

const ProfileInfo = ({
  postsCount,
  toggleModal,
  id,
  isOtherUser,
  profileInfo,
  otherUserPostsCount,
  isPrivate,
}: Props) => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const profileUser = isOtherUser ? profileInfo : user;
  const [loading, setLoading] = useState(false);
  const [isRequested, setIsRequested] = useState(false);

  const checkRequest = () => {
    if (user?._id && profileUser?.followRequests?.includes(user._id)) {
      setIsRequested(true);
    }
  };

  const handleSendFollow = async () => {
    if (!id || !user) return;

    setLoading(true);
    try {
      await axiosInstance.post("/users/request", { receiverId: id });

      if (profileInfo?.isPrivate === true) {
        setIsRequested(true);
      } else {
        profileInfo?.followers?.push(user._id);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && profileUser) {
      checkRequest();
    }
  }, [user, profileUser]);

  return (
    <div>
      {/* Header: username and logout */}
      <div className="flex justify-between items-center">
        <h1 className="font-medium text-2xl">{profileUser?.username}</h1>
        {!isOtherUser && <MdLogout onClick={logout} size={25} color="white" />}
      </div>

      {/* Avatar & stats */}
      <div className="flex justify-between items-center mt-4">
        {profileUser?.avatar ? (
          <img src={profileUser.avatar} className="h-[75px] w-[75px] object-cover rounded-full" alt="profile-image" />
        ) : (
          <BiSolidUserCircle size={80} color="white" />
        )}

        <div>
          <p className="text-center">{isOtherUser ? otherUserPostsCount : postsCount}</p>
          <p>posts</p>
        </div>

        <div>
          <p className="text-center">{profileUser?.followers?.length ?? 0}</p>
          <p>followers</p>
        </div>

        <div>
          <p className="text-center">{profileUser?.following?.length ?? 0}</p>
          <p>followings</p>
        </div>
      </div>

      {/* Bio */}
      <p className="my-4">{profileUser?.bio}</p>

      <div className="flex items-center gap-3">
        {isOtherUser && !profileInfo?.followers?.includes(user?._id!) && (
          <button
            onClick={handleSendFollow}
            disabled={loading}
            className={`${loading ? "bg-blue-400" : "bg-blue-600"} text-white rounded-md px-2 py-1`}
          >
            {isRequested ? "Requested" : "Follow"}
          </button>
        )}
        {!isPrivate && isOtherUser && (
          <button
            onClick={() => navigate(`/chat/${profileInfo?._id}`)}
            className="bg-[#ffeaa7] text-gray-600 rounded-md px-2 py-1"
          >
            Message
          </button>
        )}
      </div>

      {/* Edit button */}
      {!isOtherUser && (
        <button onClick={toggleModal} className="text-black bg-[#ffeaa7] p-2 rounded-md">
          edit profile
        </button>
      )}
    </div>
  );
};

export default ProfileInfo;
