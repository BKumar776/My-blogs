import express from "express";
import { getAllBolgs,addBlogs, updateBlog, getById, deleteBlog, getByUserId } from "../controllers/blog-controller";

const blogRouter =express.Router();

blogRouter.get('/',getAllBolgs);
blogRouter.post('/add',addBlogs);
blogRouter.put('/update/:id',updateBlog);
blogRouter.get('/:id',getById);
blogRouter.delete("/:id",deleteBlog);
blogRouter.get('/user/:id',getByUserId)


export default  blogRouter;