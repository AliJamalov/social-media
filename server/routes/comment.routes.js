import express from "express";
import { addComment, deleteComment, getPostComments } from "../controllers/comment.controller.js";
import { protectRoute } from "../middlewares/protectRoute.js";

const router = express.Router();

router.post("/", protectRoute, addComment);

router.get("/:postId", getPostComments);

router.delete("/:id", deleteComment);

export default router;
