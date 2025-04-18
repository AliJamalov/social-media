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
import { useAuthStore } from "./store/authStore";
import { ImSpinner8 } from "react-icons/im";
import { Toaster } from "react-hot-toast";

const App = () => {
  const location = useLocation();
  const pathsToHide = ["/login", "/signup", "/new-post"];

  const { user, checkAuth, checkAuthLoading } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (checkAuthLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ImSpinner8 size={35} className="animate-spin" />
      </div>
    );
  }

  const hideNavbar = pathsToHide.some((path) => location.pathname.startsWith(path));

  return (
    <div className="bg-gradient-to-r from-[#ff9966] to-[#ff5e62] min-h-screen">
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="login" />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/new-post" element={<AddPost />} />
        <Route path="/post/:id" element={<PostViewer />} />
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
