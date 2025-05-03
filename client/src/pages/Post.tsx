import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Post as PostType } from "../types";
import { axiosInstance } from "../utils/axios";
import Post from "../components/common/Post";
import PostSkeleton from "../components/common/PostSkeleton";
import Comments from "../components/common/Comments";

const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState<PostType | null>(null);
  const [isOpenComments, setIsOpenComments] = useState(false);
  const [postId, setPostId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchPostById = async () => {
    try {
      const response = await axiosInstance.get(`/posts/${id}`);
      setPost(response.data);
      setPostId(response.data._id);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPostById();
  }, [id]);

  return (
    <div>
      {loading ? (
        <PostSkeleton />
      ) : (
        post && (
          <Post
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
        )
      )}
      {isOpenComments && <Comments postId={postId} setIsOpenComments={setIsOpenComments} />}
    </div>
  );
};

export default SinglePost;
