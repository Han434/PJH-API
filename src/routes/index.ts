import express from "express";
import userRouter from "./paths/user.routes";
import businessRouter from "./paths/business.routes";

const router = express.Router();

router.use("/user", userRouter);
router.use("/business", businessRouter);

export default router;
