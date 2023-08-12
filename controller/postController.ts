import express, { Request, Response } from "express";
import { HTTP, mainError } from "../error/mainError";
import userModel from "../model/userModel";
import postModel from "../model/postModel";
import cloudinary from "../utils/cloudinary";
import mongoose from "mongoose";
import likeModel from "../model/likeModel";

export const createPost = async (req: any, res: Response) => {
  try {
    const { userID } = req.params;
    const { title, content } = req.body;

    const user: any = await userModel.findById(userID);

    if (user) {
      const { secure_url, public_id } = await cloudinary.uploader.upload(
        req?.file?.path,
      );

      const post = await postModel.create({
        title,
        content,
        image: secure_url,
        imageID: public_id,
        userID,
        user,
      });

      user.post.push(new mongoose.Types.ObjectId(post._id));
      user.save();

      return res.status(HTTP.CREATED).json({
        message: "post Created",
        data: post,
      });
    } else {
      return res.status(HTTP.BAD_REQUEST).json({ message: "Error" });
    }
  } catch (error) {
    new mainError({
      name: "Create Error",
      message: `This Error is came as a result of you creating this User!!!`,
      status: HTTP.BAD_REQUEST,
      success: false,
    });

    return res.status(HTTP.BAD_REQUEST).json({ message: "Error" });
  }
};

export const getAllPost = async (req: any, res: Response) => {
  try {
    const post = await postModel.find();

    return res.status(HTTP.OK).json({
      message: "get all post",
      data: post,
    });
  } catch (error) {
    new mainError({
      name: "Get Post Error",
      message: `This Error is came as a result of you creating this User!!!`,
      status: HTTP.BAD_REQUEST,
      success: false,
    });

    return res.status(HTTP.BAD_REQUEST).json({ message: "Error" });
  }
};

export const getUserPost = async (req: any, res: Response) => {
  try {
    const { userID } = req.params;

    const user: any = await userModel.findById(userID).populate({
      path: "post",
      options: {
        sort: { createdAt: -1 },
      },
    });

    return res.status(HTTP.OK).json({
      message: "user's post",
      data: user,
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

export const votePost = async (req: any, res: Response) => {
  try {
    const { userID, postID } = req.params;

    const post: any = await postModel.findById(postID);
    const user: any = await userModel.findById(userID);

    const like: any = await likeModel.create({
      userID,
      like: true,
    });

    post.vote.push(new mongoose.Types.ObjectId(like._id));
    post.save();

    return res.status(HTTP.OK).json({
      message: "user's has voted for this post",
      data: like,
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

export const unVotePostFalse = async (req: any, res: Response) => {
  try {
    const { userID, postID, likeID } = req.params;
    const user: any = await userModel.findById(userID);

    const post: any = await postModel.findById(postID);

    // const like: any = await likeModel.findByIdAndDelete(likeID);
    if (user) {
      const like: any = await likeModel.findByIdAndUpdate(
        likeID,
        {
          like: false,
        },
        { new: true },
      );

      return res.status(HTTP.OK).json({
        message: "user's has unvoted for this post",
      });
    } else {
      return res.status(HTTP.BAD_REQUEST).json({
        message: "User not found",
      });
    }

    // post.vote.pull(new mongoose.Types.ObjectId(likeID));
    // post.save();
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

export const unVotePost = async (req: any, res: Response) => {
  try {
    const { userID, postID, likeID } = req.params;
    const user: any = await userModel.findById(userID);

    const post: any = await postModel.findById(postID);

    const like: any = await likeModel.findByIdAndDelete(likeID);

    post.vote.pull(new mongoose.Types.ObjectId(likeID));
    post.save();

    return res.status(HTTP.OK).json({
      message: "user's has voted for this post",
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
    const { userID, postID, voteID } = req.params;

    const post: any = await postModel.findById(postID).populate({
      path: "vote",
      options: {
        sort: { createdAt: -1 },
      },
    });

    return res.status(HTTP.OK).json({
      message: "user's has voted for this post",
      data: post,
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

export const viewVotedPostTotalLike = async (req: any, res: Response) => {
  try {
    const { userID, postID, voteID } = req.params;

    const post: any = await postModel.findById(postID).populate({
      path: "vote",
      options: {
        sort: { createdAt: -1 },
      },
    });

    const likeData = post.vote
      .map((el: any) => {
        return el.like === true;
      })
      .filter((value: boolean) => value === true).length;

    const unLikeData = post.vote
      .map((el: any) => {
        return el.like === true;
      })
      .filter((value: boolean) => value === false).length;

    return res.status(HTTP.OK).json({
      message: "user's has voted for this post",
      data: { like: likeData, unLike: unLikeData },
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
