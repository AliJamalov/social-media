import express from "express";

import {
  findUsers,
  requestToFollow,
  acceptFollowRequest,
  declineFollowRequest,
  savePost,
  getSavedPosts,
  deleteFromSavedPosts,
  updateProfile,
  getUserProfile,
  getRecommendedUsers,
  getUserById,
  getMyFollowings,
} from "../controllers/user.controller.js";
import { protectRoute } from "../middlewares/protectRoute.js";

const router = express.Router();

router.get("/profile/:id", getUserProfile);

router.get("/user/:id", getUserById);

router.get("/recommended", protectRoute, getRecommendedUsers);

router.get("/my-followings", protectRoute, getMyFollowings);

router.post("/request", protectRoute, requestToFollow);

router.post("/accept", protectRoute, acceptFollowRequest);

router.post("/decline", protectRoute, declineFollowRequest);

router.post("/save-post", protectRoute, savePost);

router.get("/saved-posts", protectRoute, getSavedPosts);

router.patch("/", protectRoute, updateProfile);

router.delete("/:postId", protectRoute, deleteFromSavedPosts);

router.get("/:query", findUsers);

export default router;
