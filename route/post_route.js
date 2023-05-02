const express= require('express');
const {Post}= require('../model/post_model')

const postRouter= express.Router();


// create post
postRouter.post("/api/posts", async(req, res)=>{
    try {
        let {text,image}= req.body;
        const UserID= req.user;
        const newPost= new Post({user:UserID,image,text});
        await newPost.save();
        res.status(201).send({"msg":"Post created successfully"})
    } catch (error) {
        console.log(error.message);
        res.status(404).send({"msg":"Something went wrong"})
    }
});

// get specific post
postRouter.get("/api/posts/:id", async(req, res)=>{
    try {
        let Id=  req.params.id;
        let getPost= await Post.findById(Id);
        res.status(201).send(getPost)
    } catch (error) {
        console.log(error.message);
        res.status(404).send({"msg":"Something went wrong"})
    }
});


// delete specific post
postRouter.delete("/api/posts/:id", async(req, res)=>{
    try {
        let Id=  req.params.id;
        let getPost= await Post.findByIdAndDelete(Id);
        res.status(201).send({"msg":"Post deleted successfully"})
    } catch (error) {
        console.log(error.message);
        res.status(404).send({"msg":"Something went wrong"})
    }
});




module.exports={
    postRouter
}