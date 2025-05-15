import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Message as MessageType } from "../types";
import { axiosInstance } from "../utils/axios";
import ChatHeader from "../components/chat/ChatHeader";
import { useSocketStore } from "../store/socketStore";
import Message from "../components/chat/Message";
import Input from "../components/chat/Input";

const Chat = () => {
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  const { id } = useParams();
  const { socket } = useSocketStore();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");

  const fetchMessages = async () => {
    try {
      const response = await axiosInstance.get(`/chats/${id}`);
      setMessages(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserInfoInChat = async () => {
    try {
      const response = await axiosInstance.get(`/users/user/${id}`);
      setUsername(response.data.username);
      setAvatar(response.data.avatar);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMessages();
    fetchUserInfoInChat();
  }, [id]);

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage: MessageType) => {
      setMessages((prev) => [...prev, newMessage]);
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket]);

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <div className="p-4">
      <ChatHeader userId={id!} avatar={avatar} username={username} />
      {messages?.map((message) => (
        <div ref={lastMessageRef} key={message._id}>
          <Message {...message} />
        </div>
      ))}
      <div className="mt-15">
        <Input messages={messages} setMessages={setMessages} id={id} />
      </div>
    </div>
  );
};

export default Chat;
