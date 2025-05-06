import Story from "../models/story.model.js";

export const addStory = async (req, res) => {
  const { mediaUrl, text } = req.body;

  try {
    if (!mediaUrl) return res.status(400).json({ message: "Image is required!" });

    const newStory = new Story({
      user: req.user._id,
      mediaUrl,
      text,
    });

    await newStory.save();

    return res.status(201).json({ message: "Story has been added!", story: newStory });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getStories = async (req, res) => {
  try {
    const userIds = [...req.user.following, req.user._id];

    const stories = await Story.find({ user: { $in: userIds } })
      .populate({
        path: "user",
        match: { isPrivate: false },
        select: "username avatar _id",
      })
      .sort({ createdAt: -1 });

    const visibleStories = stories.filter((story) => {
      return story.user !== null || story.user?._id?.toString() === req.user._id.toString();
    });

    return res.status(200).json(visibleStories);
  } catch (error) {
    console.error("Error fetching stories:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getMyStory = async (req, res) => {
  try {
    const story = await Story.findOne({ user: req.user._id });

    if (!story) {
      return res.status(404).json({ message: "story not found!" });
    }

    return res.status(200).json(story);
  } catch (error) {
    console.error("Error fetching stories:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateStoryView = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    const story = await Story.findById(id);
    if (!story) {
      return res.status(404).json({ message: "Story not found!" });
    }

    if (!story.viewers.includes(userId)) {
      story.viewers.push(userId);
    }

    await story.save();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteStory = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedStory = await Story.findByIdAndDelete(id);

    if (!deletedStory) {
      return res.status(404).json({ message: "Story not found!" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getStoryById = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);

    if (!story) return res.status(404).json({ message: "Story not found!" });

    return res.status(200).json(story);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
