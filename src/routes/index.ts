import express from "express";
import userRouter from "./paths/user.routes";
import businessRouter from "./paths/business.routes";
import locationRouter from "./paths/location.routes";
import authRouter from "./paths/auth.routes";

const router = express.Router();

router.use("/user", userRouter);
router.use("/business", businessRouter);
router.use("/location", locationRouter);
router.use("/auth", authRouter);

export default router;
