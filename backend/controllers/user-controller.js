import User from "../model/User";
import bcrypt from 'bcryptjs';
export const getAllUser=async(req,resp,next)=>{
    let users;

    //db operations must b in try catch block coz db operations some time fails so


    try{
        users =await User.find();
    }catch(err){
        console.log(err);
    }
    if (!users){
        return resp.status(404).json({message:"no user found"});
    }

    return resp.status(200).json({users});
}

export const signup=async(req,resp,next)=>{
    const { name,email,password }=req.body;

    let existingUser;
    try{
        existingUser=await User.findOne({email});
    }catch(err){
        console.log(err);
    }
    if (existingUser){
        return resp.status(400).json({message:"already existing..! login instead"});
    }
    const hashedPassword = bcrypt.hashSync(password);
    const user=new User({
        name,
        email,
        password:hashedPassword,
        blogs:[],

    });

    
    try {
       await user.save();
        
    }catch{
       return console.log(err);
    }
    return resp.status(201).json({user})

};

export const login=async(req,resp,next)=>{
    const {email,password}=req.body;

    let existingUser;
    try{
        existingUser=await User.findOne({email});
    }catch(err){
        console.log(err);
    }
    if (!existingUser){
        return resp.status(404).json({message:"don't find the user by this email"});
    }

    const isPasswordCorrect = bcrypt.compareSync(password,existingUser.password);
    if(!isPasswordCorrect){
        return resp.status(400).json({message:"Incorrect password"});
    }
    return resp.status(200).json({message:"login successfull", user:existingUser});
};