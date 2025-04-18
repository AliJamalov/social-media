import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Post as PostType } from "../types";
import { axiosInstance } from "../utils/axios";
import Post from "../components/common/Post";
import { ImSpinner8 } from "react-icons/im";

const PostViewer = () => {
  const { id } = useParams();

  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/posts`);
      const allPosts = response.data.posts;

      const clickedPostIndex = allPosts.findIndex((post: PostType) => post._id === id);
      if (clickedPostIndex !== -1) {
        const clickedPost = allPosts.splice(clickedPostIndex, 1)[0];
        setPosts([clickedPost, ...allPosts]);
      } else {
        setPosts(allPosts);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ImSpinner8 color="white" size={35} className="animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {posts?.map((post) => (
        <Post
          key={post._id}
          userId={post.user._id}
          username={post.user.username}
          avatar={post.user.avatar}
          image={post.image}
          description={post.description}
          likes={post.likes}
          createdAt={post.createdAt}
        />
      ))}
    </div>
  );
};

export default PostViewer;
