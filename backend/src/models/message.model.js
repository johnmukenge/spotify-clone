import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: { type: String, required: true }, // CLERK USERID
    receiverId: { type: String, required: true }, // CLERK USERID
    content: { type: String, required: true },
  },
  { timestamps: true }
);

export const Message = mongoose.model("Message", messageSchema);
