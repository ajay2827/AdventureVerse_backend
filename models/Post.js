const mongoose=require('mongoose');

var PostSchema= new mongoose.Schema(
    {
        title:
        {
            type:String,
            required:true,
            unique:true
        },
        desc:
        {
            type:String,
            required:true,
        },
        photo:
        {
            type:String,
            required:false
        },
        username:
        {
            type:String,
            require:true
        },
        categories:
        {
            tpye:Array,
            required:false
        }
    },
    {
        timestamps:true
    }
)

module.exports=mongoose.model("Post",PostSchema);