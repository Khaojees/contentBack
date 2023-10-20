const mongoose = require('mongoose')


const blogSchema = mongoose.Schema({
      title:{
            type:String,
            required:true
      },
      content:{
            type:{},
            required:true
      },
      author:{
            type:String,
            default:"Admin"
      },
      slug:{
            type:String,
            lowercase:true,
            unique:true //ห้ามใช้ชื่อ slug ซ้ำกัน
      }
},{timestamps:true})

module.exports = mongoose.model('blogs',blogSchema)