import { FiHeart, FiMessageCircle, FiSend } from "react-icons/fi";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import { SlOptionsVertical } from "react-icons/sl";
import { formatTimeAgo } from "../../utils/formatTimeAgo";
import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../utils/axios";
import { useAuthStore } from "../../store/authStore";

type PostProps = {
  _id: string;
  userId: string;
  username: string;
  avatar: string;
  image: string;
  description: string;
  likes: number;
  createdAt: Date;
  setIsOpenComments?: (value: boolean) => void;
  setPostId?: (value: string) => void;
};

const Post = ({
  userId,
  _id,
  username,
  image,
  avatar,
  description,
  likes: initialLikes,
  createdAt,
  setPostId,
  setIsOpenComments,
}: PostProps) => {
  const { user, setUser } = useAuthStore();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const [likedPosts, setLikedPosts] = useState(false);
  const [savedPosts, setSavedPosts] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.likedPosts?.includes(_id)) {
      setLikedPosts(true);
    } else {
      setLikedPosts(false);
    }
    if (user?.savedPosts?.includes(_id)) {
      setSavedPosts(true);
    } else {
      setSavedPosts(false);
    }
  }, [user?.savedPosts]);

  const handleLikePost = async (id: string) => {
    if (loading) return;

    setLoading(true);

    const isLiked = user?.likedPosts.includes(id);

    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
    setLikedPosts((prev) => !prev);

    try {
      const response = await axiosInstance.patch(`/posts/like/${id}`);
      setUser(response.data.user);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSavePost = async (id: string) => {
    if (user?.savedPosts.includes(id)) return;
    try {
      const response = await axiosInstance.post("/users/save-post", { postId: id });
      setSavedPosts(true);
      setUser(response.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full bg-white shadow-md mx-auto mb-6 text-black pb-2 md:max-w-[500px]">
      {/* Top: user info */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-3">
          {avatar ? (
            <img src={avatar} alt="avatar" className="w-10 h-10 rounded-full object-cover" />
          ) : (
            <CgProfile size={35} />
          )}
          <Link to={`/profile/${userId}`}>
            <span className="font-semibold text-sm">{username}</span>
          </Link>
        </div>
        <SlOptionsVertical color="black" size={25} />
      </div>

      {/* Image with skeleton */}
      <div className="w-full relative">
        {!imageLoaded && <div className="w-full max-h-[500px] h-[300px] bg-gray-300 animate-pulse" />}
        <img
          src={image}
          alt="post"
          className={`w-full h-[500px] object-cover transition-opacity duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
        />
      </div>

      {/* Action buttons */}
      <div className="flex justify-between items-center px-4 pt-2">
        <div className="flex gap-4 text-2xl">
          {likedPosts ? (
            <FaHeart color="red" onClick={() => handleLikePost(_id)} />
          ) : (
            <FiHeart onClick={() => handleLikePost(_id)} />
          )}
          <FiMessageCircle
            onClick={() => {
              setIsOpenComments?.(true);
              setPostId?.(_id);
            }}
          />
          <FiSend />
        </div>

        {savedPosts ? <FaBookmark size={25} /> : <FaRegBookmark onClick={() => handleSavePost(_id)} size={25} />}
      </div>

      {/* Likes */}
      <div className="px-4 pt-2 text-sm font-semibold">{likes} likes</div>

      {/* Description */}
      <div className="px-4 pt-1 text-sm">{description}</div>

      {/* Date */}
      <div className="px-4 pt-1 text-[11px] text-gray-400 uppercase">{formatTimeAgo(createdAt)}</div>
    </div>
  );
};

export default Post;
