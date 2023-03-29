import express, { Request, Response } from "express";
import { body } from "express-validator";
import { BadRequesrError } from "../errors/bad-request-error";
import { validateRequest } from "../middlewares/validateRequest";
import { User } from "../model/userModel";
import { Password } from "../services/password";
import jwt from "jsonwebtoken";
const router = express.Router();

router.post(
  "/api/user/signin",
  [
    body("email").isEmail().withMessage("Email not valid"),
    body("password").trim().notEmpty().withMessage("Password not valid"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) throw new BadRequesrError("Invalid credentials");
    const passwordMatch = await Password.compare(
      existingUser.password,
      password
    );
    if (!passwordMatch) throw new BadRequesrError("Invalid credentials");
    const userJWT = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.jwt!
    );
    req.session = {
      jwt: userJWT,
    };
    res.status(200).send({ existingUser });
  }
);

export { router as signinRouter };
