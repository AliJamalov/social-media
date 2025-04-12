import Story from "../models/story.model.js";

export const addStory = async (req, res) => {
  const { image, text } = req.body;
  const user = req.user;

  try {
    if (!image) return res.status(400).json({ message: "Image is required!" });

    const newStory = new Story({
      user: user._id,
      image,
      text,
    });

    await newStory.save();

    return res.status(201).json({ message: "Story has been added!", story: newStory });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getMyStories = async (req, res) => {
  const userId = req.user._id;

  try {
    const stories = await Story.find({ user: userId });

    return res.status(200).json(stories);
  } catch (error) {
    console.log(error);
  }
};

export const updateStoryView = async (req, res) => {
  const { storyId } = req.params;
  const userId = req.user._id;

  try {
    const story = await Story.findById(storyId);
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
