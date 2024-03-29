import mongoose from "mongoose";

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true,
    },
    comments:[{
        type:mongoose.Types.ObjectId,
        ref:"Comment"
    }]
})

export default mongoose.model("Blog",blogSchema);