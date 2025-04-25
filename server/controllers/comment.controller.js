import Comment from "../models/comment.model.js";

export const addComment = async (req, res) => {
  const { postId, text } = req.body;
  const userId = req.user._id;
  console.log(req.body);

  try {
    if (!postId || !text) return res.status(400).json({ message: "invalid data" });

    const newComment = new Comment({
      post: postId,
      text,
      user: userId,
    });

    await newComment.save();

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
