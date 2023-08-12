import { check } from "express-validator";

export const validator = {
  registerValidator: [
    check("name").withMessage("Please fill in this field").isLength({ min: 8 }),

    check("email")
      .trim()
      .toLowerCase()
      .isEmail()
      .withMessage("Please enter your Email"),

    check("password")
      .isLength({ min: 10 })
      .matches("/^[A-Za-z0-9 .,'!&]+$/")
      .withMessage("Password doesn't pass"),
  ],
  signInValidator: [
    check("email")
      .trim()
      .toLowerCase()
      .isEmail()
      .normalizeEmail()
      .withMessage("Please Fill this field"),

    check("password")
      .trim()
      .isLength({ min: 8 })
      .withMessage("Enter Your Password"),
  ],
};

const regVal = [
  check("name")
    .isLength({ min: 2 })
    .trim()
    .withMessage("Please fill in your name"),

  check("email")
    .trim()
    .toLowerCase()
    .isEmail()
    .normalizeEmail()
    .withMessage("Please enter your Email"),

  check("password")
    .isLength({ min: 10 })
    // .matches("/^[A-Za-z0-9 .,'!&]+$/")
    .withMessage("Password doesn't pass"),
];

export { regVal };
