import mongoose from "mongoose";

const Schema = mongoose.Schema;
//build the userschema
const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:4
    },
    blogs:[{ type:mongoose.Types.ObjectId, ref:"Blog", required:true}]
})
//export the collection to mongodb
export default mongoose.model("User",userSchema);
//it will be stored as "users" as mongodb naming convention.