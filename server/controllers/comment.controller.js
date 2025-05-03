import Comment from "../models/comment.model.js";
import User from "../models/user.model.js";
import Notification from "../models/notification.model.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const addComment = async (req, res) => {
  const { postId, text, receiverId } = req.body;
  const sender = req.user;
  try {
    if (!postId || !text) return res.status(400).json({ message: "invalid data" });

    const newComment = new Comment({
      post: postId,
      text,
      user: sender._id,
    });

    await newComment.save();

    const receiver = await User.findById(receiverId);

    if (!receiver) return res.status(404).json({ message: "user not found" });

    const newNotification = new Notification({
      sender: sender._id,
      receiver: receiver._id,
      post: postId,
      type: "comment",
      text: `${sender.username} commented your post`,
    });

    await newNotification.save();

    const populatedNotification = await newNotification.populate("sender", "username avatar");

    const receiverSocketId = getReceiverSocketId(receiver._id.toString());

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newNotification", populatedNotification);
    }

    return res.status(201).json({ message: "Comment created successfully!", newComment });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getPostComments = async (req, res) => {
  const { postId } = req.params;

  try {
    const comments = await Comment.find({ post: postId }).populate("user", "username avatar");

    return res.status(200).json(comments);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteComment = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedComment = await Comment.findByIdAndDelete(id);

    if (!deletedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    return res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
