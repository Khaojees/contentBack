
const slugify = require('slugify')
const Blogs = require('../models/blogs')
const { v4: uuidv4 } = require('uuid');
//connect database
exports.create=(req,res)=>{
      const {title,content,author} =req.body
      let slug = slugify(title)

      if(!slug) {
            slug=uuidv4();
      }
      switch(true){
            case !title:
                  return res.status(400).json({error:"Enter title"}) 
                  break;
            case !content:
                  return res.status(400).json({error:"Enter content"}) 
                  break;
      }

      //save data 
      Blogs.create({title,content,author,slug})
      .then((blog) => {
            res.json(blog)
      })
      .catch((err) => {
            res.status(400).json({error:"Already have this title"})
      })
}

//get all blogs from database
exports.getAllBlogs=(req,res)=>{
      //แบบเก่าใช้ไม่ได้แล้ว
      // Blogs.find({}).exac((err,blogs)=>{
      //       res.json(blogs)
      // })
      Blogs.find({})
      .then((blogs)=>{
            res.json(blogs)
      })
}

exports.singleBlog=(req,res)=>{
      const {slug} = req.params
      Blogs.findOne({slug})
      .then((blog)=>{
            res.json(blog)
      })
}

exports.remove=(req,res)=>{
      const {slug} = req.params
      Blogs.findOneAndRemove({slug})
      .then(()=>{
            res.json({
                  message:"Deleted"
            })
      })
      .catch((err)=>{
            console.log(err)
      })
}

exports.update=(req,res)=>{
      const {currentSlug} = req.params
      const {title,content,author} =req.body
      let slug = slugify(title)

      if(!slug) {
            slug=uuidv4();
      }
      switch(true){
            case !title:
                  return res.status(400).json({error:"Enter title"}) 
                  break;
            case !content:
                  return res.status(400).json({error:"Enter content"}) 
                  break;
      }
      Blogs.findOneAndUpdate({currentSlug},{title,content,author,slug},{new:true})
      .then((blog)=>{
            res.json(blog)
      })
      .catch((err)=>{
            console.log(err)
      })
}