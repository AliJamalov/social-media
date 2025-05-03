import { useEffect, useState } from "react";
import { Post } from "../types";
import { axiosInstance } from "../utils/axios";
import { Link } from "react-router-dom";

const SavedPosts = () => {
  const [savedPosts, setSavedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSavedPosts = async () => {
    try {
      const response = await axiosInstance.get("/users/saved-posts");
      setSavedPosts(response.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedPosts();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-3 gap-1">
        {Array(20)
          .fill(null)
          .map((_, index) => (
            <div key={index} className="w-full h-[130px] bg-gray-200 animate-pulse" />
          ))}
      </div>
    );
  }

  return (
    <div className="pt-5">
      <h1 className="text-center font-medium text-white mb-5">Saved Posts</h1>
      {!loading && savedPosts.length === 0 && (
        <p className="text-white font-medium text-center mt-5">No saved posts found.</p>
      )}
      <div className="grid grid-cols-3">
        {savedPosts?.map((post) => (
          <Link key={post._id} to={`/post/${post._id}`}>
            <img src={post.image} alt="post" className="w-full h-full object-cover" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SavedPosts;
