import express from "express";

const router = express.Router();

router.get("/api/user/signout", (req, res) => {
  res.status(200).send("heeeey from api/user/signoutRouter");
});

export { router as signoutRouter };
