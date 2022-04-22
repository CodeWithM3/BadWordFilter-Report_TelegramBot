const mongoose = require('mongoose')
const Schema = mongoose.Schema
const blog = new Schema({
   
    comment:{
        type: String,
        required: true
    }

})
module.exports = Blog = mongoose.model('blog', blog) 