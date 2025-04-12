import express from "express";
import {
  createPost,
  deletePost,
  updatePost,
  toggleLikePost,
  updatePostViews,
  getUsersPosts,
  getPostById,
  fetchPosts,
} from "../controllers/post.controller.js";
import { protectRoute } from "../middlewares/protectRoute.js";

const router = express.Router();

router.post("/", protectRoute, createPost);

router.get("/my-posts", protectRoute, getUsersPosts);

router.get("/", protectRoute, fetchPosts);

router.get("/:id", protectRoute, getPostById);

router.patch("/:id", protectRoute, updatePost);

router.patch("/like/:id", protectRoute, toggleLikePost);

router.patch("/view/:id", protectRoute, updatePostViews);

router.delete("/:id", protectRoute, deletePost);

export default router;
