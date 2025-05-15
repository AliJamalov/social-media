import { useAuthStore } from "../../store/authStore";
import { extractTime } from "../../utils/extractTime";
import { Message as MessageType } from "../../types";
import { BiSolidUserCircle } from "react-icons/bi";

const Message = ({ sender, message, createdAt, media }: MessageType) => {
  const { user } = useAuthStore();

  const fromMe = sender === user?._id;
  const positionClass = fromMe ? "justify-end" : "justify-start";
  const bgColorClass = fromMe ? "bg-white text-black" : "bg-blue-500 text-white";

  return (
    <div className={`my-3 flex ${positionClass}`}>
      <div className="inline-block max-w-[75%] space-y-1">
        {/* Текст сообщения */}
        {message && <p className={`${bgColorClass} p-2 rounded-2xl font-medium`}>{message}</p>}

        {/* Репост-пост в стиле Instagram */}
        {media && (
          <div className="relative rounded-lg overflow-hidden bg-black">
            {/* Изображение */}
            <img src={media.image} alt="shared media" className="w-full max-h-[300px] object-cover" />

            {/* Overlay: аватар и имя автора */}
            <div className="absolute top-2 left-2 flex items-center gap-2 px-2 py-1 rounded-md">
              {media.user.avatar ? (
                <img src={media.user.avatar} alt="avatar" className="w-6 h-6 rounded-full object-cover" />
              ) : (
                <BiSolidUserCircle className="w-6 h-6 text-white" />
              )}
              <span className="text-sm text-white font-medium">{media.user.username}</span>
            </div>
          </div>
        )}

        {/* Время */}
        <p className="text-xs text-white text-end">{extractTime(createdAt)}</p>
      </div>
    </div>
  );
};

export default Message;
