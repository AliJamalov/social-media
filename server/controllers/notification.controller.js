import Notification from "../models/notification.model.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const createNotification = async (req, res) => {
  const sender = req.user._id;

  try {
    const { receiver, type, text, postId } = req.body;

    if (sender.equals(receiver)) {
      return res.status(400).json({ message: "You can't notify yourself" });
    }

    const newNotification = new Notification({
      sender,
      receiver,
      type,
      text,
      post: postId || null,
    });

    await newNotification.save();

    const populatedNotification = await newNotification.populate("sender", "username avatar");

    const receiverSocketId = getReceiverSocketId(receiver);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newNotification", populatedNotification);
    }

    res.status(201).json(populatedNotification);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ receiver: req.user._id })
      .sort({ createdAt: -1 })
      .limit(50)
      .populate("sender", "username avatar")
      .populate("post", "image")
      .lean();

    res.status(200).json(notifications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
