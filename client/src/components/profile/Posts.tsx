import { Post } from "../../types";
import { FaLock } from "react-icons/fa";

type PostsProps = {
  posts: Post[];
  otherUserPosts: Post[];
  isOtherUser: boolean;
  isPrivate: boolean | undefined;
};

const Posts = ({ posts, otherUserPosts, isOtherUser, isPrivate }: PostsProps) => {
  if (!isOtherUser) {
    return (
      <section className="flex flex-wrap w-full mt-5">
        {posts?.map((post) => (
          <div key={post._id} className="w-1/3 aspect-square overflow-hidden">
            <img src={post.image} alt="image" className="w-full p-[1px] h-full object-cover" />
          </div>
        ))}
      </section>
    );
  }

  if (isPrivate) {
    return (
      <div className="flex flex-col items-center justify-center mt-10 text-center text-white">
        <FaLock size={40} className="mb-4" />
        <h2 className="font-semibold text-lg">This Account is Private</h2>
        <p className="text-sm mt-1">Follow to see their photos and videos.</p>
      </div>
    );
  }

  return (
    <section className="flex flex-wrap w-full mt-5">
      {otherUserPosts?.map((post) => (
        <div key={post._id} className="w-1/3 aspect-square overflow-hidden">
          <img src={post.image} alt="image" className="w-full p-[1px] h-full object-cover" />
        </div>
      ))}
    </section>
  );
};

export default Posts;
