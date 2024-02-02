import Blog from "../model/Blog";
import Comment from "../model/Comment";
import mongoose from "mongoose";

export const addComment = async (req, res, next) => {
    const blogId = req.params.blogId; 
    const { comment } = req.body;
    
    try {
        const existingBlog = await Blog.findById(blogId).populate("user");
        
        if (!existingBlog) {
            return res.status(404).json({ message: "No Blog Found" });
        }

        const newComment = new Comment({
            comment,
            blog: existingBlog._id
        });

        const session = await mongoose.startSession();
        session.startTransaction();

        await newComment.save({ session });
        existingBlog.comments.push(newComment);
        await existingBlog.save({ session });

        await session.commitTransaction();

        return res.status(200).json({ blogId, comment: newComment.comment});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error adding comment" });
    }
};






