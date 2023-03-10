const router= require("express").Router();
const { model } = require("mongoose");
const bcrypt = require('bcrypt');
const User=require('../models/User');

// register
router.post('/register', async (req,res)=>{
    try
    {
        const salt= await bcrypt.genSalt(10);
        const hashpassword=await bcrypt.hash(req.body.password,salt);
         const newUser= new User(
            {
                username:req.body.username,
                email:req.body.email,
                password:hashpassword,
            }
            
         )
         const user= await newUser.save();
         res.status(200).json(user);
    }
    catch(err)
    {
        res.status(500).json(err)
    }
})

// login
router.post('/login', async (req,res)=>{

     try{
          const user= await User.findOne({username:req.body.username});
          !user && res.status(400).json("Wrong Credentials username");

          const valid= bcrypt.compare(req.body.password, user.password);
          !valid && res.status(400).json("Wrong Credentials password");

          const{password,...others}=user._doc;
          res.status(200).json(others);
     }
     catch(err){
         console.log(err);
     }

})


module.exports=router;