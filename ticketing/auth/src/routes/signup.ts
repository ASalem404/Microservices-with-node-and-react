import express, { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
const router = express.Router();

router.post('api/user/signup', [
  body('email')
    .isEmail()
    .withMessage('email must be valid'),
  body('passwoed')
    .trim()
    .isLength({ min: 4, max: 14 })
    .withMessage('password length is not valid')
], (req: Request, res: Response) => {

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).send(errors.array())
  }

  const { email, passwoed } = req.body


})

export { router as signupRouter }