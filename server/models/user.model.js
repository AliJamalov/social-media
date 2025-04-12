import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    bio: {
      type: String,
      required: false,
      default: "",
    },

    password: {
      type: String,
      required: true,
    },

    avatar: {
      type: String,
      required: false,
      default: "",
    },

    isPrivate: {
      type: Boolean,
      default: false,
    },

    savedPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],

    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    followRequests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    likedPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],

    lastSeen: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);

export default User;
