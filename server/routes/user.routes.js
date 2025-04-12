import express from "express";

import {
  findUsers,
  requestToFollow,
  acceptFollowRequest,
  savePost,
  deleteFromSavedPosts,
  updateProfile,
} from "../controllers/user.controller.js";
import { protectRoute } from "../middlewares/protectRoute.js";

const router = express.Router();

router.get("/", findUsers);

router.post("/request", protectRoute, requestToFollow);

router.post("/accept", protectRoute, acceptFollowRequest);

router.post("/save-post", protectRoute, savePost);

router.patch("/", protectRoute, updateProfile);

router.delete("/:postId", protectRoute, deleteFromSavedPosts);

export default router;
