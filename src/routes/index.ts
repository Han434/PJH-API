import express from "express";
import userRouter from "./paths/user.routes";

const router = express.Router();

router.use("/user", userRouter);

export default router;
