import { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { RiCloseLargeFill } from "react-icons/ri";
import { axiosInstance } from "../../utils/axios";
import { Comment } from "../../types";
import CommentSkeleton from "./CommentSkeleton";

type CommentProps = {
  setIsOpenComments: (value: boolean) => void;
  postId: string | null;
};

const Comments = ({ setIsOpenComments, postId }: CommentProps) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [addLoading, setAddLoading] = useState(false);
  const [getLoading, setGetLoading] = useState(false);
  const [receiverId, setReceiverId] = useState(null);

  const fetchComments = async () => {
    setGetLoading(true);
    try {
      const response = await axiosInstance.get(`/comments/${postId}`);
      setComments(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setGetLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  useEffect(() => {
    const fetchPostAuthor = async () => {
      try {
        const res = await axiosInstance.get(`/posts/${postId}`);
        setReceiverId(res.data.user._id);
      } catch (err) {
        console.log("Failed to fetch post:", err);
      }
    };

    if (postId) {
      fetchPostAuthor();
    }
  }, [postId]);

  const handleAddComment = async () => {
    if (addLoading || comment === "") return;
    setAddLoading(true);
    try {
      const response = await axiosInstance.post("/comments", {
        postId,
        text: comment,
        receiverId,
      });
      setComment("");
      fetchComments();
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setAddLoading(false);
    }
  };

  return (
    <section className="z-50 fixed inset-0 bg-black/50 flex justify-center items-center">
      {/* Modal */}
      <div className="bg-white w-[90%] max-w-md h-[80vh] rounded-lg flex flex-col overflow-hidden shadow-lg">
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold text-black">Comments</h2>
          <button onClick={() => setIsOpenComments(false)} className="text-gray-600 hover:text-black text-sm">
            <RiCloseLargeFill color="black" size={20} />
          </button>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {getLoading ? (
            <CommentSkeleton />
          ) : !getLoading && comments.length === 0 ? (
            <div className="text-gray-500 text-sm text-center mt-10">No comments yet.</div>
          ) : (
            comments.map((c, i) => (
              <div key={i} className="flex flex-col">
                <div className="flex items-center gap-2">
                  {c.user.avatar ? (
                    <img className="w-[40px] rounded-full" src={c.user.avatar} alt="avatar" />
                  ) : (
                    <CgProfile className="text-[40px]" color="gray" />
                  )}
                  <span className="font-semibold text-sm text-black">{c.user.username}</span>
                </div>
                <span className="text-sm text-gray-700 mt-1">{c.text}</span>
              </div>
            ))
          )}
        </div>

        {/* Input */}
        <div className="border-t p-3 text-black flex items-center gap-3">
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            type="text"
            placeholder="Add a comment..."
            className="w-full border-black p-2 border rounded-md outline-none focus:ring-1 focus:ring-gray-300"
          />
          <IoIosSend
            onClick={handleAddComment}
            size={35}
            className={`${addLoading ? "text-blue-500" : "text-blue-700"}`}
          />
        </div>
      </div>
    </section>
  );
};

export default Comments;
