import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProfileInfo from "../components/profile/ProfileInfo";
import { axiosInstance } from "../utils/axios";
import Posts from "../components/profile/Posts";
import EditProfile from "../components/profile/EditProfile";
import { User } from "../types";
import { Post as PostType } from "../types";

const Profile = () => {
  const { id } = useParams();
  const isOtherUser = !!id;

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [profileInfo, setProfileInfo] = useState<User | null>(null);
  const [otherUserPosts, setOtherUserPosts] = useState<PostType[]>([]);

  const toggleModal = () => {
    setIsOpenModal(!isOpenModal);
  };

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

  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/users/profile/${id}`);
      setProfileInfo(response.data);
      setOtherUserPosts(response.data.posts);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOtherUser) {
      fetchUserProfile();
    } else {
      getPosts();
    }
  }, [id]);

  return (
    <div className="pt-3 px-4 text-white">
      <div>
        <ProfileInfo
          otherUserPostsCount={otherUserPosts?.length}
          profileInfo={profileInfo}
          isOtherUser={isOtherUser}
          toggleModal={toggleModal}
          postsCount={posts.length}
          isPrivate={profileInfo?.isPrivate}
          id={id}
        />
        {loading && <p className="text-white text-center mt-4">Loading...</p>}
        {!loading && posts.length === 0 && (
          <Link to="/new-post" className="flex justify-center mt-4">
            {!isOtherUser && <p className="text-white font-semibold">Create your first post</p>}
          </Link>
        )}
        <Posts
          isPrivate={profileInfo?.isPrivate}
          isOtherUser={isOtherUser}
          otherUserPosts={otherUserPosts}
          posts={posts}
        />
      </div>
      {isOpenModal && <EditProfile toggleModal={toggleModal} />}
    </div>
  );
};

export default Profile;
