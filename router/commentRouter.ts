import express from "express";
import {
  createComment,
  getAllComment,
  getPostComment,
  unVoteComment,
  voteComment,
} from "../controller/commentController";

const router = express.Router();

router.route("/:userID/:postID/create-comment").post(createComment);

router.route("/get-all-comment").get(getAllComment);
router.route("/:postID/get-comment").get(getPostComment);

router.route("/:userID/:commentID/vote-comment").post(voteComment);
router.route("/:userID/:commentID/unvote-comment").post(unVoteComment);

export default router;
