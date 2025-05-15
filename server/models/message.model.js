import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    message: { type: String },

    read: {
      type: Boolean,
      default: false,
    },

    media: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  },

  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
