const mongoose = require("../Configuration/dbConfig");

const userSchema = new mongoose.Schema({
    user_name:String,
    email:String,
    password:String,
    role:{type:String, enum:["admin","customer"],default:"customer"}
});

module.exports = mongoose.model("User",userSchema);
