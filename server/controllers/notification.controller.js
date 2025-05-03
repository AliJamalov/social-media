import Notification from "../models/notification.model.js";

export const getNotifications = async (req, res) => {
  const receiverId = req.user._id;
  try {
    const notifications = await Notification.find({ receiver: receiverId })
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
