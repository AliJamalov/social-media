import express from "express";

import { addStory, deleteStory, getStories, updateStoryView, getStoryById } from "../controllers/story.controller.js";
import { protectRoute } from "../middlewares/protectRoute.js";

const router = express.Router();

router.post("/", protectRoute, addStory);

router.get("/", protectRoute, getStories);

router.get("/:id", getStoryById);

router.delete("/:id", protectRoute, deleteStory);

router.patch("/:id", protectRoute, updateStoryView);

export default router;
