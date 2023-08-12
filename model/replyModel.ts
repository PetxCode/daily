import mongoose from "mongoose";

interface iReply {
  content?: string;
  vote?: Array<string>;

  userID: string;
  comment: {};
}

interface iReplyData extends iReply, mongoose.Document {}

const replyModel = new mongoose.Schema<iReply>(
  {
    content: {
      type: String,
    },

    userID: {
      type: String,
    },

    vote: {
      type: Array<String>,
    },

    comment: {
      type: mongoose.Types.ObjectId,
      ref: "comments",
    },
  },
  { timestamps: true },
);

export default mongoose.model<iReplyData>("replies", replyModel);
