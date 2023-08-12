import mongoose from "mongoose";

interface iLike {
  userID?: string;
  like: boolean;
}

interface iLikeData extends iLike, mongoose.Document {}

const likeModel = new mongoose.Schema<iLike>(
  {
    like: {
      type: Boolean,
      default: false,
    },

    userID: {
      type: String,
    },
  },
  { timestamps: true },
);

export default mongoose.model<iLikeData>("likes", likeModel);
