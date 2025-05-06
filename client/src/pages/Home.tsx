import { useEffect, useState } from "react";
import { Post as postType } from "../types";
import { axiosInstance } from "../utils/axios";
import Topbar from "../components/home/Topbar";
import Post from "../components/common/Post";
import Comments from "../components/common/Comments";
import { useSocketStore } from "../store/socketStore";
import PostSkeleton from "../components/common/PostSkeleton";
import Stories from "../components/home/Stories";

const Home = () => {
  const { socket } = useSocketStore();
  const [posts, setPosts] = useState<postType[]>([]);
  const [loading, setLoading] = useState(true);
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
      <div className="pt-[160px]">
        {Array(4)
          .fill(null)
          .map((_, index) => (
            <PostSkeleton key={index} />
          ))}
      </div>
    );
  }

  return (
    <div className="text-white pb-14">
      <Topbar setIsHasNotification={setIsHasNotification} isHasNotification={isHasNotification} />
      <Stories />
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
