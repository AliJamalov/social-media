import { BiSolidUserCircle } from "react-icons/bi";
import { BiArrowBack } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useSocketStore } from "../../store/socketStore";

type Props = {
  username: string;
  avatar: string;
  userId: string;
};

const ChatHeader = ({ username, avatar, userId }: Props) => {
  const navigate = useNavigate();
  const { onlineUsers } = useSocketStore();

  const isOnline = onlineUsers.some((id) => id === userId);

  return (
    <section className="flex justify-between items-center mb-5">
      <Link to={`/profile/${userId}`} className="flex items-center gap-3">
        {avatar ? (
          <img src={avatar} alt="avatar" className="w-10 h-10 rounded-full object-cover" />
        ) : (
          <BiSolidUserCircle color="white" className="w-10 h-10" />
        )}
        <div>
          <p className="text-white font-medium">{username}</p>
          {isOnline && <p className="text-xs text-white">online</p>}
        </div>
      </Link>
      <button
        onClick={() => navigate("/my-chats")}
        className="bg-blue-500 flex items-center justify-center rounded-md p-1"
      >
        <BiArrowBack size={20} color="white" />
      </button>
    </section>
  );
};

export default ChatHeader;
