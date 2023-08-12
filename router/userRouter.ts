import express from "express";
import {
  getUser,
  getUsers,
  registerUser,
  signInUser,
} from "../controller/userController";
import { upload } from "../utils/multer";
import { check } from "express-validator";

const router = express.Router();

router.route("/register").post(upload, registerUser);

router
  .route("/sign-in")
  .post(
    [
      check("email")
        .trim()
        .toLowerCase()
        .isEmail()
        .normalizeEmail()
        .withMessage("This Email format is invalid"),

      check("password").isLength({ min: 8 }).withMessage("Enter Your Password"),
    ],
    signInUser,
  );

router.route("/get-user").get(getUsers);

router.route("/:userID/get-user").get(getUser);

export default router;
