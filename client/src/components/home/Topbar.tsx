import { IoChatbubblesOutline } from "react-icons/io5";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

type TopbarProps = {
  isHasNotification: boolean;
  setIsHasNotification: (value: boolean) => void;
};

const Totbar = ({ isHasNotification, setIsHasNotification }: TopbarProps) => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/notifications") {
      setIsHasNotification(false);
    }
  }, [location]);

  return (
    <section>
      <div className="flex justify-between items-center pt-4 px-3 mb-4">
        <h1>social media</h1>
        <div className="flex items-center gap-4">
          <Link to="/notifications" className="relative">
            <IoIosNotificationsOutline size={25} />
            {isHasNotification && <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full" />}
          </Link>
          <Link to="/my-chats">
            <IoChatbubblesOutline size={25} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Totbar;
