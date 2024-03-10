const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://khoapngcd201807:khoapngcd201807@ecommerce.lmrmstc.mongodb.net/?retryWrites=true&w=majority&appName=Ecommerce",{
    serverSelectionTimeoutMS: 5000
});

mongoose.connection.on("connected",()=>{
    console.log("Connected to MongoDB");
});

mongoose.connection.on("error",(err)=>{
    console.log(`MongoDB connection error: ${err}`)
});

module.exports = mongoose;