const router = require("express").Router();
const bcrypt = require('bcrypt');
const { model } = require("mongoose");
const User = require('../models/User');
const Post=require('../models/Post')

// update user
router.put('/:id', async (req, res) => {
  
        // hashing password
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }

        // updating user
        try {
            const updateuser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, { new: true });
            res.status(200).json(updateuser);
        }
        catch (err) {
            res.status(500).json(err)
        }
    
})

// delete user 
router.delete('/:id', async (req, res) => {

    // checking valid user
    if (req.body.userid === req.params.id) {

        try{

            const user= await User.findById(req.params.id);
            try
            {
                await Post.deleteMany({username:user.username});
                await User.findByIdAndDelete(req.params.id);
                res.status(200).json("User have been deleted...");
            }
            catch(err)
            {
                res.status(500).json(err);
            }
        }
        catch(err){
           res.status(404).json("User not found...")
        }
        
    }
    else {
        res.status(401).json("You can delete only your account");
    }
})
// get user
router.get('/:id', async(req,res)=>{
    try
    {
       const user = await User.findById(req.params.id);
       const{password,...others}=user._doc;
       res.status(200).json(others);
    }
    catch(err)
    {
       res.status(404).json(err);
    }
})

module.exports = router;