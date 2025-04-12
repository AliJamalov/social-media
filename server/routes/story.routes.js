import express from "express";

import { addStory, deleteStory, updateStoryView } from "../controllers/story.controller.js";
import { protectRoute } from "../middlewares/protectRoute.js";

const router = express.Router();

router.post("/", addStory);

router.delete("/:storyId", protectRoute, deleteStory);

router.patch("/", protectRoute, updateStoryView);

export default router;
