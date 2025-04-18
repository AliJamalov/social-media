import { useEffect, useState } from "react";
import { IoChatbubblesOutline } from "react-icons/io5";
import { ImSpinner8 } from "react-icons/im";
import { Post as postType } from "../types";
import { axiosInstance } from "../utils/axios";
import Post from "../components/common/Post";

const Home = () => {
  const [posts, setPosts] = useState<postType[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/posts");
      setPosts(response.data.posts);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ImSpinner8 color="white" size={35} className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="text-white">
      <div className="flex justify-between items-center pt-4 px-3 mb-4">
        <h1>Instakilogram</h1>
        <IoChatbubblesOutline size={25} />
      </div>
      <section>
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
      </section>
    </div>
  );
};

export default Home;
