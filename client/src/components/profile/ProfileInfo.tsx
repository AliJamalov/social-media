import { useEffect, useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { CgProfile } from "react-icons/cg";
import { axiosInstance } from "../../utils/axios";
import { MdLogout } from "react-icons/md";
import { Post } from "../../types";

const ProfileInfo = () => {
  const { user } = useAuthStore();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getPosts = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/posts/my-posts");
      setPosts(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="font-medium text-2xl">{user?.username}</h1>
        <MdLogout size={25} color="white" />
      </div>
      <div className="flex justify-between items-center mt-4">
        {user?.avatar ? <img src={user?.avatar} alt="profile-image" /> : <CgProfile size={70} color="white" />}
        {/* posts */}
        <div>
          <p className="text-center">{posts.length}</p>
          <p>posts</p>
        </div>
        {/* followers */}
        <div>
          <p className="text-center">{user?.followers.length}</p>
          <p>followers</p>
        </div>
        {/* followings */}
        <div>
          <p className="text-center">{user?.following.length}</p>
          <p>followings</p>
        </div>
      </div>
      <p className="my-4">{user?.bio}ddd</p>
      <button className="text-black bg-[#ffeaa7] p-2 rounded-md">edit profile</button>
    </div>
  );
};

export default ProfileInfo;
