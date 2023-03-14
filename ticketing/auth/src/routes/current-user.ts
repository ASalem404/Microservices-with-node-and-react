import express from "express";

const router = express.Router();

router.get("/api/user/currentuser", (req, res) => {
  res.send({ message: "Heeey from /api/users/currentuser" });
});

export { router as currentUserRouter };
