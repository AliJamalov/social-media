import { BiSolidUserCircle } from "react-icons/bi";

type Props = {
  username: string;
  avatar: string;
};

const Conversation = ({ username, avatar }: Props) => {
  return (
    <section className="px-3">
      <div className="flex items-center gap-3 bg-white rounded-md p-2 my-2">
        {avatar ? (
          <img className="w-10 h-10 rounded-full object-cover" src={avatar} alt="avatar" />
        ) : (
          <BiSolidUserCircle color="gray" className="w-10 h-10" />
        )}
        <p className="font-medium">{username}</p>
      </div>
    </section>
  );
};

export default Conversation;
