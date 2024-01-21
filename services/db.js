const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/ContactApp')
const contact = mongoose.model('contact',{
    name:String,
    phno:String,
    email:String,
    address:String
})
module.exports={
    contact
}