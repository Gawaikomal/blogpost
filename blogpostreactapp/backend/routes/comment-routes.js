import express from "express";
import { addComment } from "../controllers/comment-controller";
const commentRouter = express.Router();

commentRouter.post("/:blogId",addComment);

export default commentRouter;