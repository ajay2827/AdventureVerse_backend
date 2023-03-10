const express=require('express');
const app= express();
const dotenv=require('dotenv');
const mongoose = require('mongoose');
const authrouter=require('./routes/auth');
const userrouter=require('./routes/users');
const postrouter=require('./routes/posts');
const categoryrouter=require('./routes/categorys');
const multer = require('multer');
const cors=require('cors');
const { json } = require('express');
const path = require('path');
const port=5000;

dotenv.config();
app.use(express.json());

// Set the strictQuery option to false
mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(console.log("Connected"))
.catch((err)=>
    console.log(err)
);

// middleware
app.use(cors())
app.use('/Images',express.static(path.join(__dirname,"Images")))

// router
app.use('/api/auth',authrouter);
app.use('/api/users',userrouter);
app.use('/api/posts',postrouter);
app.use('/api/categorys',categoryrouter);

// multer 
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'Images');
     },
    filename: function (req, file, cb) {
        cb(null , req.body.name);
    }
});

var upload = multer({ storage: storage })

app.post('/api/upload', upload.single('file') , (req, res) =>{
    try {
        res.status(200).json("File has been uploaded....")
    } catch(error) {
           res.status(500).json(err);
    }
});

app.listen(port,()=>{
    console.log(`Sever is starting at port number ${port} ...`);
})
