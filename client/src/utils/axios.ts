import axios from "axios";

const isLocalhost = window.location.hostname === "localhost";

export const axiosInstance = axios.create({
  baseURL: isLocalhost ? "http://localhost:5000/api" : "https://social-media-lf3m.onrender.com/api",
  withCredentials: true,
});
