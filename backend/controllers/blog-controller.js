import mongoose from "mongoose";
import Blog from "../model/Blog";
import User from "../model/User";

export const getAllBolgs =async(req,resp,next)=>{
    let blogs;
    try{
        blogs =await Blog.find().populate('user');
    }catch(err){
            console.log(err)
    }
    if(!blogs){
        return resp.status(404).json({message:"No blogs found"})
    }

    return resp.status(200).json({blogs});
}

export const addBlogs = async (req,resp,next)=>{
    const {title,description,image,user} =req.body;

    let existingUser;
    try{
        existingUser=await User.findById(user);
    }catch(err){
        return console.log(err);
    }
    if(!existingUser){
       return resp.status(400).json({message:"unable to find user by this id"}) 
    }

    const blog= new Blog({
        title,
        description,
        image,
        user,

    });

    try{
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({session});
        existingUser.blogs.push(blog);
        await existingUser.save({session});
        await session.commitTransaction();
    }catch(err){
        console.log(err);
        return res.status(500).json({message :err})
    }
    return resp.status(200).json({blog});
}

export const updateBlog=async(req,resp,next)=>{
    const {title,description}=req.body;
    const blogId=req.params.id;
    let blog;
   try{
     blog= await Blog.findByIdAndUpdate(blogId,{
        title,
        description
    })
   } catch(err){
        return console.log(err);
    }
    if(!blog){
        return resp.status(500).json({message:"unable to update the blog"})
    }

    return resp.status(200).json({blog});

}

export const getById= async(req,resp,next)=>{
    const id= req.params.id;
    let blog;
    try{
        blog= await Blog.findById(id)
    }catch(err){
        return console.log(err);
    }
    if(!blog){
        return resp.status(404).json({message:"no blog found"})
    }
    return resp.status(200).json({blog});
};

export const deleteBlog=async(req,resp,next)=>{
    const id =req.params.id;

    let blog;
    try{
        blog=await Blog.findByIdAndRemove(id).populate('user');

        await blog.user.blogs.pull(blog);
        await blog.user.save();
    }catch(err){
        console.log(err);
    }
    if(!blog){
        return resp.status(500).json({message:"unable to to delete"})
    }
    return  resp.status(200).json({message:"successfully deleted"})
};

export const getByUserId =async (req,resp,next)=>{
    const userId =req.params.id;
    let userBlogs;
    try{
        userBlogs= await User.findById(userId).populate("blogs");
    }catch(err){
        return console.log(err)
    }
    if(!userBlogs){
        return resp.status(404).json({message:"no blog found"})
    }
    return resp.status(200).json({user:userBlogs})
}