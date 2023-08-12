import express, { Request, Response } from "express";
import { HTTP, mainError } from "../error/mainError";
import userModel from "../model/userModel";
import postModel from "../model/postModel";
import mongoose from "mongoose";
import likeModel from "../model/likeModel";
import commentModel from "../model/commentModel";

export const createComment = async (req: any, res: Response) => {
  try {
    const { userID, postID } = req.params;
    const { content } = req.body;

    const user: any = await userModel.findById(userID);
    const post: any = await postModel.findById(postID);

    if (user) {
      const comment = await commentModel.create({
        content,
        userID,
      });

      post.comment.push(new mongoose.Types.ObjectId(comment._id));
      post.save();

      return res.status(HTTP.CREATED).json({
        message: "comment Created",
        data: comment,
      });
    } else {
      return res.status(HTTP.BAD_REQUEST).json({ message: "Error" });
    }
  } catch (error) {
    new mainError({
      name: "Create comment Error",
      message: `This Error is came as a result of you creating this comment!!!`,
      status: HTTP.BAD_REQUEST,
      success: false,
    });

    return res.status(HTTP.BAD_REQUEST).json({ message: "Error" });
  }
};

export const getAllComment = async (req: any, res: Response) => {
  try {
    const comment = await commentModel.find();

    return res.status(HTTP.OK).json({
      message: "get all coment",
      data: comment,
    });
  } catch (error) {
    new mainError({
      name: "Get comment Error",
      message: `This Error is came as a result of you creating this User!!!`,
      status: HTTP.BAD_REQUEST,
      success: false,
    });

    return res.status(HTTP.BAD_REQUEST).json({ message: "Error" });
  }
};

export const getPostComment = async (req: any, res: Response) => {
  try {
    const { userID, postID } = req.params;

    const post: any = await postModel.findById(postID).populate({
      path: "comment",
      options: {
        sort: { createdAt: -1 },
      },
    });

    return res.status(HTTP.OK).json({
      message: "post's post",
      data: post,
    });
  } catch (error) {
    new mainError({
      name: "user post comment Error",
      message: `This Error is came as a result of you creating this post comment!!!`,
      status: HTTP.BAD_REQUEST,
      success: false,
    });

    return res.status(HTTP.BAD_REQUEST).json({ message: "Error" });
  }
};

export const voteComment = async (req: any, res: Response) => {
  try {
    const { userID, commentID } = req.params;

    const comment: any = await commentModel.findById(commentID);

    comment.vote.push(userID);
    comment.save();

    return res.status(HTTP.OK).json({
      message: "user's has voted for this comment",
      data: comment,
    });
  } catch (error) {
    new mainError({
      name: "user cooment Error",
      message: `This Error is came as a result of you creating this comment!!!`,
      status: HTTP.BAD_REQUEST,
      success: false,
    });

    return res.status(HTTP.BAD_REQUEST).json({ message: "Error" });
  }
};

export const unVoteComment = async (req: any, res: Response) => {
  try {
    const { userID, postID, commentID } = req.params;
    const comment: any = await commentModel.findById(commentID);

    comment.vote.pull(userID);
    comment.save();

    return res.status(HTTP.OK).json({
      message: "user's has voted for this comment",
    });
  } catch (error) {
    new mainError({
      name: "user post Error",
      message: `This Error is came as a result of you creating this User!!!`,
      status: HTTP.BAD_REQUEST,
      success: false,
    });

    return res.status(HTTP.BAD_REQUEST).json({ message: "Error" });
  }
};

// export const viewVotedPost = async (req: any, res: Response) => {
//   try {
//     const { userID, postID, voteID } = req.params;

//     const post: any = await postModel.findById(postID).populate({
//       path: "vote",
//       options: {
//         sort: { createdAt: -1 },
//       },
//     });

//     return res.status(HTTP.OK).json({
//       message: "user's has voted for this post",
//       data: post,
//     });
//   } catch (error) {
//     new mainError({
//       name: "user post Error",
//       message: `This Error is came as a result of you creating this User!!!`,
//       status: HTTP.BAD_REQUEST,
//       success: false,
//     });

//     return res.status(HTTP.BAD_REQUEST).json({ message: "Error" });
//   }
// };
