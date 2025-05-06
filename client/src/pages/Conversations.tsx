import { useEffect } from "react";
import useConversationStore from "../store/conversation";
import { ImSpinner8 } from "react-icons/im";
import RecommendedAccounts from "../components/common/RecommendedUsers";
import Conversation from "../components/conversation/Conversation";
import { Link } from "react-router-dom";

const Conversations = () => {
  const { conversations, getChats, chatsLoading, recommendedUsersLoading, getRecommendedUsers, recomendedUsers } =
    useConversationStore();

  useEffect(() => {
    getChats();
    getRecommendedUsers();
  }, []);

  return (
    <div className="p-4">
      {!chatsLoading && conversations?.length === 0 && (
        <p className="text-center font-medium text-white">No chats yet. Find someone to connect with!</p>
      )}

      {/* Conversations */}
      {chatsLoading ? (
        <div className="flex items-center justify-center">
          <ImSpinner8 size={35} className="animate-spin" color="white" />
        </div>
      ) : (
        conversations?.map((dialog) => (
          <Link to={`/chat/${dialog?.participants[0]?._id}`} key={dialog._id}>
            <Conversation username={dialog.participants[0]?.username} avatar={dialog.participants[0]?.avatar} />
          </Link>
        ))
      )}

      {!recommendedUsersLoading && <p className="text-center font-medium text-white mt-10">Recommended users</p>}
      {/* Recommended users */}
      {recommendedUsersLoading ? (
        <div className="flex items-center justify-center mt-[100px]">
          <ImSpinner8 size={35} className="animate-spin" color="white" />
        </div>
      ) : (
        recomendedUsers?.map((account) => (
          <div key={account._id}>
            <RecommendedAccounts userId={account._id} username={account.username} avatar={account.avatar} />
          </div>
        ))
      )}
    </div>
  );
};

export default Conversations;
