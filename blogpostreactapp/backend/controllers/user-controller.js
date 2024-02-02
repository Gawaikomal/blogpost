import User from "../model/User";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

export const getAllUser = async(req,res,next) => {
    let users;
    try {
        users = await User.find();
    } catch (error) {
        return console.log(error);
    }
    if(!users){
        return res.status(404).json({message:"No user found"});
    }
    return res.status(200).json({users});
}

export const signUp = async(req,res,next) => {
    const {name, email, password} = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({email});
    } catch (error) {
        return console.log(error);
    }
    if(existingUser){
        return res.status(400).json({message:"User Already Exists! Login Instead "})
    }

    const hashedPassword = bcrypt.hashSync(password);
    const user = new User ({
        name,
        email,
        password:hashedPassword,
        blogs:[]
    });
    try {
        await user.save();
    } catch (error) {
        return console.log(error)
    }
    return res.status(201).json({user});
}

export const signIn = async (req, res, next) => {
    const { email, password } = req.body;
    let existingUser;
  
    try {
      existingUser = await User.findOne({ email });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  
    if (!existingUser) {
      return res.status(404).json({ message: 'No user found by this mail id' });
    }
  
    const isPasswordCorrect = await bcrypt.compareSync(
      password,
      existingUser.password
    );
  
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Incorrect Password' });
    }
  
    // If login is successful, create a JWT token
    const token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      'your-secret-key',
      { expiresIn: '1h' } // Set the expiration time of the token
    );
  
    res.status(200).json({ message: 'Login Successful', token,existingUser });
  };


  
  