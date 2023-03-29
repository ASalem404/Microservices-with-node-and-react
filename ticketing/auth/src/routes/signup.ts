import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { User } from "../model/userModel";
import { RequestValidationError } from "../errors/request-validation-error";
import { BadRequesrError } from "../errors/bad-request-error";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post(
  "/api/user/signup",
  [
    body("email").isEmail().withMessage("email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 14 })
      .withMessage("password length is not valid"),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;
    const isExist = await User.findOne({ email });
    if (isExist) {
      throw new BadRequesrError("email is already exist");
    }
    const user = User.build({ email, password });
    const userJWT = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.jwt!
    );
    req.session = {
      jwt: userJWT,
    };
    user.save().then(() => {
      res.send({ user });
    });
  }
);
export { router as signupRouter };
