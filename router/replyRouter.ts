import express from "express";
import {
  createReply,
  getAllReply,
  getCommentReply,
  unVoteReply,
  voteReply,
} from "../controller/replyController";

const router = express.Router();

router.route("/:userID/:commentID/create-reply").post(createReply);

router.route("/get-all-reply").get(getAllReply);
router.route("/:commentID/get-reply").get(getCommentReply);

router.route("/:userID/:replyID/vote-reply").post(voteReply);
router.route("/:userID/:replyID/:likeID/unvote-reply").post(unVoteReply);

export default router;
