const router = require("express").Router();
const bcrypt = require('bcrypt');
const { model } = require("mongoose");
const User = require('../models/User');
const Post=require('../models/Post')

// create post
router.post("/",async (req,res)=>{
          
    const newpost= new Post(req.body);
    try{
         const savepost= await newpost.save();
         res.status(200).json(savepost);
    }
    catch(err)
    {
         res.status(500).json(err);
    }
})

// update post
router.put("/:id", async(req,res)=>{
    try{
         const post= await Post.findById(req.params.id);
         if(post.username===req.body.username)
         {
            try
            {
                const updatepost= await Post.findByIdAndUpdate(req.params.id,{
                    $set:req.body
                },{new:true})
            }
            catch(err)
            {
                res.status(500).json(err);
            }
         }
         else
         {
            res.status(404).json("You can update your post only...")
         }
    }
    catch(err)
    {
        res.status(500).json(err);
    }
})

// delete post
router.delete("/:id", async(req,res)=>{
    try{
         const post= await Post.findById(req.params.id);
         if(post.username===req.body.username)
         {
            try
            {
               await post.delete();
               res.status(200).json("Post has been deleted :)");
            }
            catch(err)
            {
                res.status(500).json(err);
            }
         }
         else
         {
            res.status(404).json("You can delete your post only...")
         }
    }
    catch(err)
    {
        res.status(500).json(err);
    }
})

// get post

router.get('/:id', async(req,res)=>{
    try
    {
       const post = await Post.findById(req.params.id);
       res.status(200).json(post);
    }
    catch(err)
    {
       res.status(404).json(err);
    }
})

// get all posts

router.get("/", async(req,res)=>{
    const Username=req.query.user;
    const CategoryName=req.query.cat;
    try{
        let posts;
        if(Username)
        {
            posts=await Post.find({username:Username});
        }
        else if(CategoryName)
        {
            posts=await Post.find({categories:
                {
                    $in:[CategoryName]
                }
            })
        }
        else 
        {
            posts = await Post.find();
        }
        res.status(200).json(posts);
    }
    catch(err)
    {
        res.status(500).json(err);
    }
})
module.exports = router;