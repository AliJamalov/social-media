import { BiSolidUserCircle } from "react-icons/bi";
import { useSocketStore } from "../../store/socketStore";

type Props = {
  username: string;
  avatar: string;
  userId: string;
};

const Conversation = ({ username, avatar, userId }: Props) => {
  const { onlineUsers } = useSocketStore();

  const isOnline = onlineUsers.some((id) => id === userId);

  return (
    <section className="px-3">
      <div className="flex items-center gap-3 bg-white rounded-md p-2 my-2">
        {avatar ? (
          <div className="w-10 h-10 relative">
            <img className="w-full h-full rounded-full object-cover" src={avatar} alt="avatar" />
            {isOnline && <div className="w-3 h-3 rounded-full bg-green-500 absolute bottom-0 right-0"></div>}
          </div>
        ) : (
          <div className="w-11 h-11 relative">
            <BiSolidUserCircle color="gray" className="w-full h-full" />
            {isOnline && <div className="w-3 h-3 rounded-full bg-green-500 absolute bottom-1 right-1"></div>}
          </div>
        )}
        <p className="font-medium">{username}</p>
      </div>
    </section>
  );
};

export default Conversation;
