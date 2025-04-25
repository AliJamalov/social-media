import { useEffect, useState } from "react";
import { ImSpinner8 } from "react-icons/im";
import { Post as postType } from "../types";
import { axiosInstance } from "../utils/axios";
import Topbar from "../components/home/Topbar";
import Post from "../components/common/Post";
import Comments from "../components/home/Comments";
import { useSocketStore } from "../store/socketStore";

const Home = () => {
  const { socket } = useSocketStore();
  const [posts, setPosts] = useState<postType[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpenComments, setIsOpenComments] = useState(false);
  const [postId, setPostId] = useState<string | null>(null);
  const [isHasNotification, setIsHasNotification] = useState(false);

  useEffect(() => {
    if (!socket) return;

    const handleNotification = () => {
      setIsHasNotification(true);
    };

    socket.on("newNotification", handleNotification);

    return () => {
      socket.off("newNotification", handleNotification);
    };
  }, [socket]);

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
    <div className="text-white pb-14">
      <Topbar setIsHasNotification={setIsHasNotification} isHasNotification={isHasNotification} />
      <section>
        {posts?.map((post) => (
          <Post
            key={post._id}
            _id={post._id}
            userId={post.user._id}
            username={post.user.username}
            avatar={post.user.avatar}
            image={post.image}
            description={post.description}
            likes={post.likes}
            createdAt={post.createdAt}
            setIsOpenComments={setIsOpenComments}
            setPostId={setPostId}
          />
        ))}
      </section>
      {isOpenComments && <Comments postId={postId} setIsOpenComments={setIsOpenComments} />}
    </div>
  );
};

export default Home;
