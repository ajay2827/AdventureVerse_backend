const router= require("express").Router();
const Category=require('../models/Category');

// create category
router.post("/", async(req,res)=>{

    const newcategory = new Category(req.body);
    try{
        const savecategory= await newcategory.save();
        res.status(200).json(savecategory);

    }catch(err)
    {
        res.status(500).json(err);
    }
})

// get category

router.get("/", async (req,res)=>{
    try{
        const Cate= await Category.find();
        res.status(200).json(Cate);
    }
    catch(err)
    {
        res.status(500).json(err);
    }
})

module.exports = router;