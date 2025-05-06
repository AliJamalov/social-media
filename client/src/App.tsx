import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/layout/Navbar";
import Explore from "./pages/Explore";
import AddPost from "./pages/AddPost";
import Profile from "./pages/Profile";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import PostViewer from "./pages/PostViewer";
import Notifications from "./pages/Notifications";
import SavedPosts from "./pages/SavedPosts";
import SinglePost from "./pages/Post";
import NewStory from "./pages/NewStory";
import Stories from "./pages/Stories";
import Conversations from "./pages/Conversations";
import { useAuthStore } from "./store/authStore";
import { ImSpinner8 } from "react-icons/im";
import { Toaster } from "react-hot-toast";
import { useSocketStore } from "./store/socketStore";
import Chat from "./pages/Chat";

const App = () => {
  const location = useLocation();
  const pathsToHide = ["/login", "/signup", "/new-post", "/stories", "/my-chats", "/chat"];

  const { user, checkAuth, checkAuthLoading } = useAuthStore();
  const { connectSocket, disconnectSocket } = useSocketStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (user) {
      connectSocket(user);
    } else {
      disconnectSocket();
    }
  }, [user]);

  if (checkAuthLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ImSpinner8 size={35} className="animate-spin" />
      </div>
    );
  }

  const hideNavbar = pathsToHide.some((path) => location.pathname.startsWith(path));

  return (
    <div className="bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#ff0080] min-h-screen">
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="login" />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/my-chats" element={<Conversations />} />
        <Route path="/chat/:id" element={<Chat />} />
        <Route path="/new-post" element={<AddPost />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/saved-posts" element={<SavedPosts />} />
        <Route path="/new-story" element={<NewStory />} />
        <Route path="/stories/:id" element={<Stories />} />
        <Route path="/posts/:id" element={<PostViewer />} />
        <Route path="/post/:id" element={<SinglePost />} />
        <Route path="/profile/:id?" element={user ? <Profile /> : <Navigate to="/" />} />
        <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
        <Route path="/login" element={!user ? <Signin /> : <Navigate to="/" />} />
      </Routes>
      {!hideNavbar && <Navbar />}
      <Toaster />
    </div>
  );
};

export default App;
