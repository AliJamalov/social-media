import Post from "../models/post.model.js";
import User from "../models/user.model.js";

export const createPost = async (req, res) => {
  const { image, description, tags, taggedUsers } = req.body;
  const user = req.user._id;

  try {
    if (!image) return res.status(400).json({ message: "Image is required!" });
    const newPost = new Post({
      user,
      image,
      description,
      tags,
      taggedUsers,
    });

    await newPost.save();

    res.status(201).json({ message: "Post created successfully!", post: newPost });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) return res.status(404).json({ message: "Post not found" });

    return res.status(200).json({ message: "Post has been deleted!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { image, description, tags, taggedUsers } = req.body;

  try {
    const post = await Post.findById(id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    if (image) post.image = image;
    if (description) post.description = description;
    if (tags) post.tags = tags;
    if (taggedUsers) post.taggedUsers = taggedUsers;

    await post.save();
    return res.status(200).json({ message: "post has been updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getUsersPosts = async (req, res) => {
  const userId = req.user._id;

  try {
    const posts = await Post.find({ user: userId }).sort({ createdAt: -1 });

    return res.status(200).json(posts);
  } catch (error) {
    console.log("Error fetching user posts:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const toggleLikePost = async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  try {
    const post = await Post.findById(id);

    if (!post) return;

    const alreadyLiked = user.likedPosts.includes(post._id);

    if (alreadyLiked) {
      post.likes--;
      user.likedPosts = user.likedPosts.filter((likedPost) => likedPost._id.toString() !== post._id.toString());
    } else {
      post.likes++;
      user.likedPosts = user.likedPosts.push(post._id);
    }

    await post.save();
    await user.save();

    return res.status(200).json(post);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updatePostViews = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findByIdAndUpdate(id, { $inc: { views: 1 } }, { new: true });

    if (!post) return res.status(404).json({ message: "Post not found" });

    return res.status(200).json(post);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const fetchPosts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const publicUsers = await User.find({ isPrivate: false }).select("_id");
    const publicUserIds = publicUsers.map((user) => user._id);

    const posts = await Post.find({ user: { $in: publicUserIds } })
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      page,
      limit,
      count: posts.length,
      posts,
    });
  } catch (error) {
    console.log("Error fetching posts:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id).populate("user", "username avatar");

    if (!post) {
      return res.status(404).json({ message: "Post not found!" });
    }

    return res.status(200).json(post);
  } catch (error) {
    console.log("Error fetching post:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
