import express from "express";

const router = express.Router();

router.get("/api/user/signin", (req, res) => {
  res.status(200).send("heeeey from api/user/signin");
});

export { router as signinRouter };
