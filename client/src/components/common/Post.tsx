import { FiHeart, FiMessageCircle, FiSend } from "react-icons/fi";
import { BsBookmark } from "react-icons/bs";
import { formatTimeAgo } from "../../utils/formatTimeAgo";
import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";

type PostProps = {
  userId: string;
  username: string;
  avatar: string;
  image: string;
  description: string;
  likes: number;
  createdAt: Date;
};

const Post = ({ userId, username, image, avatar, description, likes, createdAt }: PostProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="max-w-md w-full bg-white shadow-md mx-auto mb-6 text-black pb-2">
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
      </div>

      {/* Image with skeleton */}
      <div className="w-full relative">
        {!imageLoaded && <div className="w-full max-h-[500px] h-[300px] bg-gray-300 animate-pulse" />}
        <img
          src={image}
          alt="post"
          className={`w-full object-cover max-h-[500px] transition-opacity duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
        />
      </div>

      {/* Action buttons */}
      <div className="flex justify-between items-center px-4 pt-2">
        <div className="flex gap-4 text-2xl">
          <FiHeart />
          <FiMessageCircle />
          <FiSend />
        </div>
        <BsBookmark className="text-2xl" />
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
