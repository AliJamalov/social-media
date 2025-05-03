import { useEffect, useState } from "react";
import { Notification } from "../types";
import { axiosInstance } from "../utils/axios";
import { CgProfile } from "react-icons/cg";
import { ImSpinner8 } from "react-icons/im";
import { useAuthStore } from "../store/authStore";
import { formatTimeAgo } from "../utils/formatTimeAgo";

const Notifications = () => {
  const { setUser } = useAuthStore();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [acceptLoading, setAcceptLoading] = useState(false);

  const fetchNotifications = async () => {
    try {
      const response = await axiosInstance.get("/notifications");
      setNotifications(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptRequest = async (senderId: string, notId: string) => {
    setAcceptLoading(true);
    try {
      const response = await axiosInstance.post("/users/accept", { senderId, notificationId: notId });
      fetchNotifications();
      setUser(response.data.user);
    } catch (error) {
      console.log(error);
    } finally {
      setAcceptLoading(false);
    }
  };

  const handleDeclineRequest = async (senderId: string, notId: string) => {
    setAcceptLoading(true);
    try {
      const response = await axiosInstance.post("/users/decline", { senderId, notificationId: notId });
      fetchNotifications();
      setUser(response.data.user);
    } catch (error) {
      console.log(error);
    } finally {
      setAcceptLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="p-3">
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <ImSpinner8 color="white" size={35} className="animate-spin" />
        </div>
      ) : notifications.length === 0 ? (
        <p className="text-center font-medium text-white mt-4">No new notifications</p>
      ) : (
        notifications.map((not) => (
          <div
            key={not._id}
            className="p-4 mb-3 rounded-xl bg-white shadow-md flex justify-between items-start gap-4 hover:bg-gray-50 transition"
          >
            <div className="flex items-center gap-3">
              {not.sender.avatar ? (
                <img src={not.sender.avatar} alt="avatar" className="w-12 h-12 rounded-full object-cover border" />
              ) : (
                <CgProfile size={48} className="text-gray-400" />
              )}
            </div>

            <div className={`${not.type === "comment" || "like" ? "flex gap-3 items-center" : "flex-1"} `}>
              <p className="text-sm text-gray-800">@{not.text}</p>

              {not.type === "follow" && (
                <div className="flex gap-2 mt-3">
                  <button
                    disabled={acceptLoading}
                    onClick={() => handleAcceptRequest(not.sender._id, not._id)}
                    className={`${
                      acceptLoading ? "bg-blue-500" : "bg-blue-300"
                    } px-4 py-1 bg-blue-500 text-white rounded-full text-sm font-medium hover:bg-blue-600 transition`}
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleDeclineRequest(not.sender._id, not._id)}
                    className={`${
                      acceptLoading ? "bg-gray-200" : "bg-gray-100"
                    } px-4 py-1 text-gray-800 rounded-full text-sm font-medium hover:bg-gray-300 transition`}
                  >
                    Decline
                  </button>
                </div>
              )}

              {not.type === "comment" && (
                <div className="w-[60px] h-[60px]">
                  <img src={not.post?.image} className="w-full h-full object-cover rounded-md" alt="post" />
                </div>
              )}
              <p className="text-sm text-gray-800">{formatTimeAgo(not.createdAt)}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Notifications;
