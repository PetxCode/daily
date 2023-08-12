import express from "express";
import { image } from "../utils/multer";
import {
  createPost,
  getAllPost,
  getUserPost,
  unVotePost,
  unVotePostFalse,
  viewVotedPost,
  viewVotedPostTotalLike,
  votePost,
} from "../controller/postController";

const router = express.Router();

router.route("/:userID/create-post").post(image, createPost);

router.route("/get-all-post").get(getAllPost);

router.route("/:userID/get-post").get(getUserPost);

router.route("/:userID/:postID/vote-post").post(votePost);
router.route("/:userID/:postID/:likeID/unvote-post").post(unVotePost);
router
  .route("/:userID/:postID/:likeID/unvote-post-false")
  .post(unVotePostFalse);

router.route("/:postID/view-vote-post").get(viewVotedPost);

router.route("/:postID/view-vote-post-total").get(viewVotedPostTotalLike);

export default router;
