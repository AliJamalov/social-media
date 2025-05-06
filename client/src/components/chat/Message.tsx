import { useAuthStore } from "../../store/authStore";
import { extractTime } from "../../utils/extractTime";

type Props = {
  sender: string;
  read: boolean;
  message: string;
  createdAt: Date;
};

const Message = ({ sender, read, message, createdAt }: Props) => {
  const { user } = useAuthStore();

  const fromMe = sender === user?._id;
  const positionClass = fromMe ? "justify-end" : "justify-start";
  const bgColorClass = fromMe ? "bg-white text-black" : "bg-blue-500 text-white";

  return (
    <div className={`my-3 flex ${positionClass}`}>
      <div className="inline-block max-w-[70%]">
        <p className={`${bgColorClass} p-2 rounded-2xl font-medium`}>{message}</p>
        <p className="text-xs text-black mt-1 text-end">{extractTime(createdAt)}</p>
      </div>
    </div>
  );
};

export default Message;
