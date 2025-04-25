import express from "express";
import { getNotifications, createNotification } from "../controllers/notification.controller.js";
import { protectRoute } from "../middlewares/protectRoute.js";

const router = express.Router();

router.post("/", protectRoute, createNotification);

router.get("/", getNotifications);

export default router;
