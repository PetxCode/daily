import express, { Request, Response } from "express";
import { HTTP, mainError } from "../error/mainError";
import userModel from "../model/userModel";
import postModel from "../model/postModel";
import mongoose from "mongoose";
import commentModel from "../model/commentModel";
import replyModel from "../model/replyModel";

export const createReply = async (req: any, res: Response) => {
  try {
    const { userID, postID, commentID } = req.params;
    const { content } = req.body;

    const user: any = await userModel.findById(userID);
    const comment: any = await commentModel.findById(commentID);

    if (user) {
      const reply = await replyModel.create({
        content,
        userID,
      });

      comment.reply.push(new mongoose.Types.ObjectId(reply._id));
      comment.save();

      return res.status(HTTP.CREATED).json({
        message: "reply for comment Created",
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

export const getAllReply = async (req: any, res: Response) => {
  try {
    const reply = await replyModel.find();

    return res.status(HTTP.OK).json({
      message: "get all coment",
      data: reply,
    });
  } catch (error) {
    new mainError({
      name: "Get reply Error",
      message: `This Error is came as a result of you creating this User!!!`,
      status: HTTP.BAD_REQUEST,
      success: false,
    });

    return res.status(HTTP.BAD_REQUEST).json({ message: "Error" });
  }
};

export const getCommentReply = async (req: any, res: Response) => {
  try {
    const { userID, postID, commentID } = req.params;

    const comment: any = await commentModel.findById(commentID).populate({
      path: "reply",
      options: {
        sort: { createdAt: -1 },
      },
    });

    return res.status(HTTP.OK).json({
      message: "comment's comment",
      data: comment,
    });
  } catch (error) {
    new mainError({
      name: "user post comment reply, Error",
      message: `This Error is came as a result of you creating this post comment!!!`,
      status: HTTP.BAD_REQUEST,
      success: false,
    });

    return res.status(HTTP.BAD_REQUEST).json({ message: "Error" });
  }
};

export const voteReply = async (req: any, res: Response) => {
  try {
    const { userID, commentID, replyID } = req.params;

    const reply: any = await replyModel.findById(replyID);

    console.log(reply);

    reply.vote.push(userID);
    reply.save();

    return res.status(HTTP.OK).json({
      message: "user's has voted for this reply",
      data: reply,
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

export const unVoteReply = async (req: any, res: Response) => {
  try {
    const { userID, postID, commentID, replyID } = req.params;
    const reply: any = await replyModel.findById(replyID);

    reply.vote.pull(userID);
    reply.save();

    return res.status(HTTP.OK).json({
      message: "user's has voted for this reply",
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

export const viewVotedPost = async (req: any, res: Response) => {
  try {
    const { userID, postID, voteID, commentID, replyID } = req.params;

    const reply: any = await replyModel.findById(replyID).populate({
      path: "vote",
      options: {
        sort: { createdAt: -1 },
      },
    });

    return res.status(HTTP.OK).json({
      message: "user's has voted for this reply",
      data: reply.vote.length,
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
