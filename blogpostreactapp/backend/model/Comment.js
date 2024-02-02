import mongoose from "mongoose";

const Schema = mongoose.Schema;

const commentSchema  = new Schema({
    comment:{
        type:String,
        required:false
    },
    blog:{
        type:mongoose.Types.ObjectId,
        ref:"Blog",
        required:true,
    }
})

export default mongoose.model("Comment",commentSchema);