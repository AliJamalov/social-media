import express from "express";
import { getMessages, getMyChats, sendMessage } from "../controllers/message.controller.js";
import { protectRoute } from "../middlewares/protectRoute.js";

const router = express.Router();

router.get("/my-chats", protectRoute, getMyChats);

router.post("/:id", protectRoute, sendMessage);

router.get("/:id", protectRoute, getMessages);

export default router;
