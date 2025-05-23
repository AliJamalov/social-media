import express from "express";
import { getNotifications } from "../controllers/notification.controller.js";
import { protectRoute } from "../middlewares/protectRoute.js";

const router = express.Router();

router.get("/", protectRoute, getNotifications);

export default router;
