import User from "../models/user.model.js";

export const requestToFollow = async (req, res) => {
  const { receiverId } = req.body;
  const sender = req.user;

  try {
    const receiver = await User.findById(receiverId);

    if (!receiver) {
      return res.status(404).json({ message: "User not found" });
    }

    if (sender.following.includes(receiverId)) return;

    if (receiver.isPrivate) {
      receiver.followRequests.push(sender._id);
    } else {
      receiver.followers.push(sender._id);
      sender.following.push(receiver._id);
    }

    await receiver.save();
    await sender.save();

    return res.status(201);
  } catch (error) {
    console.log(error);
  }
};

export const acceptFollowRequest = async (req, res) => {
  const { senderId } = req.body;
  const user = req.user;

  try {
    if (!senderId) return res.status(400).json({ message: "senderId not found" });

    const requestedUser = await User.findById(senderId);

    if (!requestedUser) {
      return res.status(404).json({ message: "requested follow user not found" });
    }

    if (!user.followRequests.includes(senderId)) {
      return res.status(400).json({ message: "Follow request not found" });
    }

    user.followRequests = user.followRequests.filter((reqId) => reqId.toString() !== senderId.toString());

    user.followers.push(senderId);

    requestedUser.following.push(user._id);

    await requestedUser.save();
    await user.save();

    return res.status(200).json({ message: "Follow request accepted" });
  } catch (error) {
    console.log("Error accepting follow request:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const findUsers = async (req, res) => {
  const { query } = req.params;

  try {
    if (query && query.length > 2 && typeof query === "string") {
      const users = await User.find({
        username: { $regex: query, $options: "i" },
      });

      if (users.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json(users);
    } else {
      return res.status(400).json({ message: "Invalid search query" });
    }
  } catch (error) {
    console.log("Error in findUsers:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const savePost = async (req, res) => {
  const { postId } = req.body;
  const user = req.user;

  try {
    if (!postId) {
      return res.status(400).json({ message: "Post ID is required" });
    }

    if (user.savedPosts.includes(postId)) {
      return res.status(400).json({ message: "Post already saved" });
    }

    user.savedPosts.push(postId);
    await user.save();

    return res.status(200).json({
      message: "Post saved successfully",
      savedPosts: user.savedPosts,
    });
  } catch (error) {
    console.log("Error saving post:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteFromSavedPosts = async (req, res) => {
  const { postId } = req.params;
  const user = req.user;
  try {
    if (!postId) {
      return res.status(400).json({ message: "Post ID is required" });
    }

    if (user.savedPosts.includes(postId)) {
      user.savedPosts = user.savedPosts.filter((savedPostId) => savedPostId.toString() !== postId.toString());
    }

    await user.save();

    return res.status(200).json({
      message: "Post deleted successfully",
      savedPosts: user.savedPosts,
    });
  } catch (error) {
    console.log("Error deleting post:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProfile = async (req, res) => {
  const { avatar, bio } = req.body;
  const user = req.user;

  try {
    if (avatar) user.avatar = avatar;
    if (bio) user.bio = bio;

    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully",
      user: {
        avatar: user.avatar,
        bio: user.bio,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
