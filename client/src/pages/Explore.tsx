import { useEffect, useState } from "react";
import { axiosInstance } from "../utils/axios";
import { Post } from "../types";
import { Link } from "react-router-dom";
import Searchbar from "../components/explore/Searchbar";
import SearchResult from "../components/explore/SearchResult";
import { User } from "../types";

const Explore = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [isShowSearchResult, setIsShowSearchResult] = useState(false);
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/posts");
      setPosts(response.data.posts);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const searchUsers = async () => {
    try {
      const response = await axiosInstance.get(`/users/${query}`);
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (query) {
      const timer = setTimeout(() => searchUsers(), 500);
      return () => clearTimeout(timer);
    } else {
      setUsers([]);
    }
  }, [query]);

  if (loading) {
    return (
      <div className="grid grid-cols-3 gap-1">
        {Array(20)
          .fill(null)
          .map((_, index) => (
            <div key={index} className="w-full h-[130px] bg-gray-200 animate-pulse" />
          ))}
      </div>
    );
  }

  return (
    <section>
      <Searchbar
        setQuery={setQuery}
        isShowSearchResult={isShowSearchResult}
        setIsShowSearchResult={setIsShowSearchResult}
      />
      {isShowSearchResult && <SearchResult users={users} />}
      {!isShowSearchResult && (
        <div className="grid grid-cols-3">
          {posts.map((post) => (
            <Link to={`/post/${post._id}`} key={post._id}>
              <img src={post.image} alt="explore-img" className="w-full h-full object-cover" />
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default Explore;
