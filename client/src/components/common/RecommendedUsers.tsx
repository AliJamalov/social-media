import { BiSolidUserCircle } from "react-icons/bi";
import { Link } from "react-router-dom";

type Props = {
  username: string;
  avatar: string;
  userId: string;
};

const RecommendedAccounts = ({ username, avatar, userId }: Props) => {
  return (
    <div className="space-y-4 p-2">
      <div className="grid gap-4">
        <div className="flex items-center justify-between p-3 rounded-lg bg-white">
          <Link to={`/profile/${userId}`} className="flex items-center space-x-3">
            {avatar ? (
              <img src={avatar} className="w-10 h-10 rounded-full object-cover" />
            ) : (
              <BiSolidUserCircle className="w-10 h-10" color="gray" />
            )}
            <div>
              <p className="font-medium">{username}</p>
            </div>
          </Link>
          <button className="text-sm font-medium bg-blue-500 px-2 py-1 rounded-md text-white">Follow</button>
        </div>
      </div>
    </div>
  );
};

export default RecommendedAccounts;
