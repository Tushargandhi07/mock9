const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../model/user_model');
const { authentication } = require('../middleware/authenticate');

const userRouter= express.Router();


// Registeration
userRouter.post("/api/register",async(req,res)=>{
    try {
        const {name,email,password,dob,bio} = req.body;
        let alreadyUser = await User.find({email});

        if(alreadyUser.length>0){
            res.status(400).send({"msg":"Email already registered"});
        }
        else{
            bcrypt.hash(password,5,async(err,hash_password)=>{
                if(err){
                    res.status(400).send({"msg":"Error while hashing password"});
                }
                else{
                    let newUser = new User({name,email,password:hash_password,dob,bio});
                    await newUser.save();
                    res.status(201).send({"mag":"Registered"});
                }
            });
        }

    } catch (error) {
        console.log(error.message);
        res.status(404).send({"mag":"Something went wrong"});
    }
});


// Login
userRouter.post("/api/login",async(req,res)=>{
    try {
        const {email,password} = req.body;
        let alreadyUser = await User.findOne({email});

        if(!alreadyUser){
            res.status(400).send({"msg":"Email not found"});
        }
        else{
            bcrypt.compare(password,alreadyUser.password,(err,result)=>{
                if(result){
                    const token= jwt.sign({userID:alreadyUser._id},"tushar");
                    res.status(201).send({"msg":"Login successfull","token":token})
                }
                else{
                    res.status(400).send({"msg":"wrong credentials"});
                }
            })
        }

    } catch (error) {
        console.log(error.message);
        res.status(404).send({"mag":"Something went wrong"});
    }
});

// get all users
userRouter.get("/api/users",async(req,res)=>{
    try {
        let allUsers = await User.find();
        res.status(200).send(allUsers)
    } catch (error) {
        res.status(404).send({"mag":"Something went wrong"});
    }
});


// get all friends of particular user
userRouter.get("/api/users/:id/friends",async(req,res)=>{
    try {
        let id= req.params.id;
        let allUsers = await User.findById(id);
        res.status(201).send(allUsers.friends);
    } catch (error) {
        res.status(404).send({"mag":"Something went wrong"});
    }
});


// send friend request to particular user
// ***********login required*************
userRouter.post("/api/users/:id/friends",authentication,async(req,res)=>{
    try {
        let id= req.params.id;
        let userID= req.user

        if(id==undefined){
            res.status(404).send({"mag":"Fill all the credentials"});
        }
        
        let getFriend= await User.findById(id);
        if(getFriend.friendRequests.includes(userID) || getFriend.friends.includes(userID)){
            res.status(404).send({"mag":"Request failed"});
        }
        else{
            getFriend.friendRequests.push(userID);
            await getFriend.save();
            return res.status(201).send({"msg":"Friend request sent successfully"});
        }

    } catch (error) {
        res.status(404).send({"mag":"Something went wrong"});
    }
});


//Accept or reject friend request
// ***********login required*************
userRouter.patch("/api/users/:id/friends/:friendId",authentication,async(req,res)=>{
    try {
        let id= req.params.id;
        let friendID= req.params.friendId;
        let {status}= req.body;

        const finduser = await User.findById(id);

        if(!finduser){
            res.status(400).send({"msg": "User not found"});
        }
        else{
            if(finduser.friendRequests.includes(friendID)){
                let filter=finduser.friendRequests.filter(element => {
                        return element != friendID
                });
                finduser.friendRequests=filter;
                await finduser.save();
                if(status=="accepted"){
                    finduser.friends.push(friendID);
                    await finduser.save();
                    res.status(204).send({"msg":"Request accepted"})
                }
                else{
                    res.status(204).send({"msg":"Request rejected"})
                }
            }
            else{
                return res.status(201).send({"msg":"user not found"});
            }
        }
        

    } catch (error) {
        res.status(404).send({"msg":"Something went wrong"});
    }
});







module.exports={
    userRouter
}