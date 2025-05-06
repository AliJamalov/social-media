import { BsFillSendFill } from "react-icons/bs";
import { axiosInstance } from "../../utils/axios";
import { useState } from "react";
import { Message } from "../../types";

type Props = {
  id: string | undefined;
  messages: Message[];
  setMessages: (data: Message[]) => void;
};

const Input = ({ id, messages, setMessages }: Props) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendeMessage = async () => {
    if (!message) return;
    setLoading(true);
    try {
      const response = await axiosInstance.post(`/chats/${id}`, { message });
      setMessages([...messages, response.data]);
      setMessage("");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 shadow-lg">
      <div className="flex items-center gap-2 max-w-2xl mx-auto">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          className="flex-1 text-white border border-white rounded-full py-3 px-4 outline-none"
          placeholder="message..."
        />
        <button onClick={handleSendeMessage} className={`${loading ? "bg-blue-500" : "bg-blue-600"} p-3 rounded-full`}>
          <BsFillSendFill size={20} className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default Input;
