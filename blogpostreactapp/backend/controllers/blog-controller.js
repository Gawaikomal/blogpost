import mongoose from "mongoose";
import Blog from "../model/Blog";
import User from "../model/User";
import jwt from 'jsonwebtoken';

export const getAllBlogs = async(req,res,next) =>{
    let blogs;
    try {
        blogs = await Blog.find().populate('comments');
    } catch (error) {
        console.log(error);
    }
    if (!blogs){
        return res.status(404).json({message:"No blogs"})
    }
    return res.status(200).json({blogs})

}

export const addBlog = async(req,res,next) => {
  const { title, description, user,comment } = req.body;
  let existingUser;
  try {
      existingUser = await User.findById(user);
  } catch (error) {
      console.log(error);
  }
  if(!existingUser){
      return res.status(400).json({message:"Unable to find user by this ID"})
  }
  const blog = new Blog({
      title,
      description,
      user,
      comment
  })
  //to add blogs to the user we need to start the session instead of just saving
  try {
      const session = await mongoose.startSession();
      session.startTransaction()
      await blog.save({session});
      existingUser.blogs.push(blog);
      await existingUser.save({session});
      await session.commitTransaction();
  } catch (error) {
      console.log(error)
      return res.status(500).json({message:error})
  }
  return res.status(200).json({blog});
}

export const updateBlog = async(req,res,next) => {
 const { title, description } = req.body;
 const blogId = req.params.id;
let blog;
 try {
    blog = await Blog.findByIdAndUpdate(blogId,{
        title,
        description
    })
 } catch (error) {
     console.log(error)
 }
 if(!blog){
     return res.status(400).json({message:"Unable to update"})
 }
 return res.status(200).json({blog});
}

export const deleteBlog = async(req,res,next) => {
const blogId = req.params.id;
let blog;
try {
    blog = await Blog.findByIdAndDelete(blogId).populate('User');
    await blog.user.blogs.pull(blog);
    await blog.user.save();
} catch (error) {
    console.log(error);
}
if(!blog){
    return res.status(500).json({message:"Unable to delete"})
}
return res.status(200).json({message:"Successfully deleted"});
}

export const getByUserId = async (req, res, next) => {
    const userId = req.params.id; // Correct parameter name
  
    let userBlogs;
    try {
      userBlogs = await Blog.find({ user: userId }).populate("user"); // Assuming 'user' is the field in your Blog model representing the user
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error fetching blogs" });
    }
  
    if (!userBlogs || userBlogs.length === 0) {
      return res.status(404).json({ message: "No blogs found" });
    }
  
    return res.status(200).json({ blogs: userBlogs });
  };