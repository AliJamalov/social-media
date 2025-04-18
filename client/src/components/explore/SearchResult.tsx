import { User } from "../../types";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";

type typeProps = {
  users: User[];
};

const SearchResult = ({ users }: typeProps) => {
  return (
    <section className="bg-white rounded-md shadow-md mt-2 max-h-[300px] overflow-y-auto">
      <ul>
        {users.map((user) => (
          <Link key={user._id} to={`/profile/${user._id}`}>
            <li className="flex items-center gap-3 p-3 border-b border-gray-200 hover:bg-gray-100 cursor-pointer">
              {user.avatar ? (
                <img src={user.avatar} alt="avatar" className="w-10 h-10 rounded-full object-cover" />
              ) : (
                <CgProfile size={30} />
              )}
              <span className="text-sm font-medium text-black">{user.username}</span>
            </li>
          </Link>
        ))}
      </ul>
    </section>
  );
};

export default SearchResult;
