import { useAuthStore } from "../../store/authStore";
import { CgProfile } from "react-icons/cg";
import { MdLogout } from "react-icons/md";
import { User } from "../../types";

type Props = {
  postsCount: number;
  toggleModal: () => void;
  isOtherUser: boolean;
  profileInfo: User | null;
  otherUserPostsCount: number | null | undefined;
  isPrivate: boolean | undefined;
};

const ProfileInfo = ({ postsCount, toggleModal, isOtherUser, profileInfo, otherUserPostsCount, isPrivate }: Props) => {
  const { user, logout } = useAuthStore();

  const profileUser = isOtherUser ? profileInfo : user;

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
          <CgProfile size={70} color="white" />
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

      {isOtherUser && (
        <div className="flex items-center gap-3">
          <button className="bg-blue-600 text-white rounded-md px-2 py-1">Follow</button>
          {!isPrivate && <button className="bg-[#ffeaa7] text-gray-600 rounded-md px-2 py-1">Message</button>}
        </div>
      )}

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
